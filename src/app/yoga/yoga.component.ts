// yoga.component.ts

import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-yoga',
    templateUrl: './yoga.component.html',
    styleUrls: ['./yoga.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class YogaComponent {

  tips = [
    {
      title: 'Sivananda Yoga',
      description: 'Yoga contributes to a healthy and happy life!',
      points: [
        'Make Yoga a part of your routine.',
        'Continue your religious practices from back home.',
        'Teach your kids the importance of embracing their true selves.',
      ],
      writer: 'Yogaacharya Shankar Prasad'
    },

  ];
}
