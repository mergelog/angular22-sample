import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LessonCard } from './children/lesson-card/lesson-card';
import type { Lesson } from './models/lesson';

@Component({
  selector: 'app-sample-02-standalone',
  imports: [LessonCard],
  templateUrl: './sample-02-standalone.html',
  styleUrl: './sample-02-standalone.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sample02Standalone {
  readonly lesson: Lesson = {
    title: 'standalone component',
    description: '各コンポーネントが、自分のテンプレートで使う依存だけを imports に宣言します。',
    status: '学習中',
  };
}
