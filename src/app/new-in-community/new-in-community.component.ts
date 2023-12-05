import { Component } from '@angular/core';

@Component({
  selector: 'app-new-in-community',
  templateUrl: './new-in-community.component.html',
  styleUrls: ['./new-in-community.component.css']
})
export class NewInCommunityComponent {

  tips = [
    {
      title: 'Tip 1',
      points: [
        "If you are new to America, here are some conversation guidelines:",
        "Never inquire about someone's income.",
        "Avoid asking about their visa status.",
        "Avoid questions about their sexual orientation.",
        "Avoid making jokes about race, ethnicity, or religion.",
      ],
      writer: 'Shankar Pandey'
    },
    {
      title: 'Tip 2',
      points: [
        "Avoid applying for too many store or credit cards.",
        "Don't hesitate to ask for help politely when needed.",
        "Find metro and bus routes using Google Maps.",
        "Remember to return shopping carts to the designated area.",
      ],
      writer: 'Yasoda Pandey'
    },
    {
      title: 'Tip 3',
      description: 'Here\'s a third tip for you. Customize it as needed.',
      writer: 'Writer Name'
    },
    // Add more tips as needed
  ];

}
