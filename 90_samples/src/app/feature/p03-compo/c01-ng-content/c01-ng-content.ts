import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Child } from './child/child';

@Component({
  selector: 'app-c01-ng-content',
  imports: [RouterLink, Child],
  templateUrl: './c01-ng-content.html',
  styleUrl: './c01-ng-content.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class C01NgContent {}
