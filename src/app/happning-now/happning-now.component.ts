import { Component } from '@angular/core';

@Component({
  selector: 'app-happning-now',
  templateUrl: './happning-now.component.html',
  styleUrls: ['./happning-now.component.css']
})
export class HappningNowComponent {

  events = [
    {
      title: 'TAMU DHEE VIRGINIA TAMU LOCHHAR',
      description: 'Join us for an unforgettable cultural experience at TAMU DHEE VIRGINIA TAMU LOCHHAR. TAMU Lochchar is a traditional Nepali festival celebrated with great enthusiasm and joy. It is a time when the community comes together to showcase our rich cultural heritage through vibrant performances, delicious traditional cuisine, and engaging activities for all ages.\n' +
       '\n\ ',

      address: 'Hotel Hilton\n\\6550 Loisdale Rd\nSpringfield, VA 22150',
      info: 'Ticket - $40, family-friendly event',

    },

    {
      title: 'Holiday Walk of Lights',
      description: 'Holiday Walk of Lights is back this year and brighter than ever! Experience the magic of the holiday season as you walk down a path of unique, hand-crafted light displays at Neabsco Regional Park. Bring family and friends and be prepared to be in awe of the dazzling lights that surround us! Runs through December 23, 2023.',
      address: '15125 Blackburn Rd\n' +
        'Woodbridge, VA 22191',
      info: 'Free admission, family-friendly event',
    },
    {
      title: 'Bull Run Festival of Lights',
      description: 'Every year from November until just after New Year’s Day, you can experience the Bull Run Festival of Lights, 2.5 miles illuminated by holiday light displays. Drive the festival route from the comfort of your car; turn off your headlights and just follow the magical glow. \n' +
        '\n',
      address: '7700 Bull Run Dr, Centreville, VA 20109, USA\n',
      info: 'Tickets: $30',
    },

    {
      title: 'National Christmas Tree Lighting',
      description: 'The National Christmas Tree is located on the Ellipse, south of the White House. From December 2, 2023 to January 1, 2024, the National Christmas Tree and 58 smaller trees are open to the public from 10 am to 10 pm daily, with extended hours until 11 pm Friday-Saturday. The lights turn on near sunset each evening. The tree and grounds are free to visit \n' +
        '\n',
      address: 'Near White House \n',
      info: 'Free event',
    },
    // Add more events as needed
  ];


  getChristmasColor(index: number): string {
    const colors = ['bg-danger', 'bg-success', 'bg-warning', 'bg-info', 'bg-primary', 'bg-secondary'];
    return colors[index % colors.length];
  }

}
