import { Component } from '@angular/core';

@Component({
  selector: 'app-trekking',
  templateUrl: './trekking.component.html',
  styleUrls: ['./trekking.component.css']
})
export class TrekkingComponent {
  trekkingRoutes = [
    {
      title: 'Annapurna Base Camp Trek: Accelerated time saving Route',
      description: [
        'Day 1: Pokhara to Jhinu by Jeep. Begin your adventure by catching a jeep at Baglung Bus Park in Pokhara. After lunch in Jhinu, continue your trek towards Chhomrong and then to Sinuwa (Lower Sinuwa is fine, altitude 2,360m).',
        'Day 2: Trek from Sinuwa to Deurali (elevation: 3,230m). This leg of the journey takes you deeper into the heart of the Annapurna region.',
        'Day 3: Stop for lunch at Machhapuchhre Base Camp (elevation: 3,700m) and experience the breathtaking surroundings. Make sure to start early to reach Annapurna Base Camp (elevation: 4,130m) by 2 PM.',
        'Day 4: Begin your descent back to Sinuwa. This day marks the start of your journey back, carrying memories of the majestic mountains.',
        'Day 5: Trek from Sinuwa to Jhinu, and then return to Pokhara. Celebrate the completion of your trek with a relaxing soak in the Jhinu hot springs.',
        'Best of luck on your trek! This condensed route offers a unique and exhilarating experience of the Annapurna region.'
      ],
      colorClass: 'annapurna'
    },
    {
      title: 'Everest Base Camp Trek',
      description: [
        'Embark on an unforgettable journey to the Everest Base Camp.'
      ],
      colorClass: 'everest'
    },
    {
      title: 'Langtang Valley Trek',
      description: [
        'Discover the scenic beauty of the Langtang Valley on this trek.'
      ],
      colorClass: 'langtang'
    }
    // Add more trekking routes as needed
  ];
}
