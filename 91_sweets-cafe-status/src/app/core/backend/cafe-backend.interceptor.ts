import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { mergeMap, Observable, of, throwError, timer } from 'rxjs';

import { CAFE_CONFIG, CafeConfig } from '../config/cafe.config';
import { TABLE_STATUSES, TableStatus, UpdateTableRequest } from '../model/cafe-status.model';
import { CafeSimulationStore } from './cafe-simulation.store';

const STATUS_API_URL = '/api/cafe-status';
const ORDERS_API_URL = '/api/cafe-orders';

// [■観点:HttpInterceptorFn] 実サーバーの代わりに、この関数がローカルAPIを横取りします。
export const cafeBackendInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  if (
    request.url !== STATUS_API_URL &&
    !request.url.startsWith(`${STATUS_API_URL}/`) &&
    request.url !== ORDERS_API_URL
  ) {
    return next(request);
  }

  const store = inject(CafeSimulationStore);
  const config = inject(CAFE_CONFIG);
  let response$: Observable<HttpEvent<unknown>>;

  if (request.url === ORDERS_API_URL) {
    response$ =
      request.method === 'GET'
        ? of(new HttpResponse({ status: 200, body: store.getOrders() }))
        : methodNotAllowed(request.url);

    return timer(getRandomApiResponseDelay(config)).pipe(mergeMap(() => response$));
  }

  switch (request.method) {
    case 'GET':
      response$ = of(new HttpResponse({ status: 200, body: store.getDashboard() }));
      break;
    case 'PUT': {
      const updateRequest = parseUpdateRequest(request.body);

      if (!updateRequest) {
        response$ = badRequest('tableNumber、status、people、billingAmount の値を確認してください。');
        break;
      }

      const updatedTable = store.updateTable(updateRequest);
      response$ = updatedTable ? of(new HttpResponse({ status: 200, body: updatedTable })) : notFound();
      break;
    }
    case 'DELETE': {
      const tableNumber = decodeURIComponent(request.url.slice(`${STATUS_API_URL}/`.length));

      if (!tableNumber || request.url === STATUS_API_URL) {
        response$ = badRequest('DELETEにはテーブルナンバーが必要です。');
        break;
      }

      const clearedTable = store.clearTable(tableNumber);
      response$ = clearedTable ? of(new HttpResponse({ status: 200, body: clearedTable })) : notFound();
      break;
    }
    default:
      response$ = methodNotAllowed(request.url);
  }

  // [■観点:擬似通信遅延] timer の後で購読することで、成功とエラーの両方をランダムに遅延させます。
  return timer(getRandomApiResponseDelay(config)).pipe(mergeMap(() => response$));
};

function getRandomApiResponseDelay(config: CafeConfig): number {
  const { apiResponseDelayMinMs: min, apiResponseDelayMaxMs: max } = config;

  if (!Number.isInteger(min) || !Number.isInteger(max) || min < 0 || max < min) {
    throw new Error('CAFE_CONFIG API response delay range is invalid.');
  }

  return min + Math.floor(Math.random() * (max - min + 1));
}

function methodNotAllowed(url: string): Observable<never> {
  return throwError(
    () =>
      new HttpErrorResponse({
        status: 405,
        statusText: 'Method Not Allowed',
        url,
      }),
  );
}

function parseUpdateRequest(body: unknown): UpdateTableRequest | undefined {
  if (!isRecord(body)) {
    return undefined;
  }

  const { tableNumber, status, people, billingAmount } = body;
  const validPeople =
    people === undefined || (typeof people === 'number' && Number.isInteger(people) && people >= 0);
  const validBilling =
    billingAmount === undefined || (typeof billingAmount === 'number' && billingAmount >= 0);

  if (typeof tableNumber !== 'string' || !isTableStatus(status) || !validPeople || !validBilling) {
    return undefined;
  }

  return {
    tableNumber,
    status,
    ...(typeof people === 'number' ? { people } : {}),
    ...(typeof billingAmount === 'number' ? { billingAmount } : {}),
  };
}

function isTableStatus(value: unknown): value is TableStatus {
  return typeof value === 'string' && TABLE_STATUSES.some((status) => status === value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function badRequest(message: string): Observable<never> {
  return throwError(
    () =>
      new HttpErrorResponse({
        status: 400,
        statusText: 'Bad Request',
        error: { message },
      }),
  );
}

function notFound(): Observable<never> {
  return throwError(
    () =>
      new HttpErrorResponse({
        status: 404,
        statusText: 'Not Found',
        error: { message: '指定されたテーブルが見つかりません。' },
      }),
  );
}
