// yoga.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-yoga',
  templateUrl: './yoga.component.html',
  styleUrls: ['./yoga.component.css']
})
export class YogaComponent {

  tips = [
    {
      title: 'Tip 1',
      description: 'Yoga contributes to a healthy and happy life!',
      points: [
        'Make Yoga a part of your routine.',
        'Continue your religious practices from back home.',
        'Teach your kids the importance of embracing their true selves.',
      ],
      writer: 'Shankar Pandey'
    },
    {
      title: 'Tip 2',
      description: 'This is another useful tip. Customize it as needed.',
      writer: 'Writer Name'
    },
    {
      title: 'Tip 3',
      description: 'Here\'s a third tip for you. Customize it as needed.',
      writer: 'Writer Name'
    },
    // Add more tips as needed
  ];
}
