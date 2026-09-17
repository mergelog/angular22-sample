import { TestBed } from '@angular/core/testing';

import { Dashboard } from './dashboard';

describe('Dashboard', () => {
  it('hello dashboard を表示する', () => {
    TestBed.configureTestingModule({ imports: [Dashboard] });

    const fixture = TestBed.createComponent(Dashboard);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('hello dashboard');
  });
});
