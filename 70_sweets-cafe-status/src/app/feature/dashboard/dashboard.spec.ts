import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Dashboard } from './dashboard';

describe('Dashboard', () => {
  it('JSON表示ページへのリンクを表示する', () => {
    TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [provideRouter([])],
    });

    const fixture = TestBed.createComponent(Dashboard);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('a').getAttribute('href')).toBe('/view-json');
  });
});
