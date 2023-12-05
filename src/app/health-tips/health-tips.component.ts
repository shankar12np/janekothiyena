import { Component } from '@angular/core';

@Component({
  selector: 'app-health-tips',
  templateUrl: './health-tips.component.html',
  styleUrls: ['./health-tips.component.css']
})
export class HealthTipsComponent {

  tips = [
    {
      title: 'Tip 1',
      description: '"Health is Wealth. Peace of mind is happiness." - Swami Sivananda',
      points: [
        'Avoid giving soda (Coke, Fanta, etc.) to your kids.',
        'Be mindful of the sugar content in juices; try to consume them in moderation.',
        'Avoid developing a habit of eating junk food (chips, sausages, etc.).',
        // Add more points as needed
      ],
      writer: 'CNA Babita Bhandari'
    },
    {
      title: 'Tip 2',
      description: 'This is another useful tip. Customize it as needed.',
      points: [
        // Add points for Tip 2
      ],
      writer: 'Writer Name'
    },
    // Add more tips as needed
  ];

}
