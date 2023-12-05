import { Component } from '@angular/core';

@Component({
  selector: 'app-real-estate',
  templateUrl: './real-estate.component.html',
  styleUrls: ['./real-estate.component.css']
})
export class RealEstateComponent {

  tips = [
    {
      title: 'Tip 1',
      description: 'Buying your first home right is the best thing you could ever do for your family.',
      points: [
        'Establish a realistic budget considering property cost, closing costs, and maintenance.',
        'Get pre-approved for a mortgage to understand your borrowing capacity.',
        'Thoroughly research neighborhoods, considering safety, schools, and future property value.',
        'Utilize the expertise of a real estate agent for guidance and effective negotiation.',
        // Add more points as needed
      ],
      writer: 'Realtor Kushum Acharya'
    },
    {
      title: 'Tip 2',
      description: 'Buy and build equity in your home.',
      points: [
        'Save at least 20% of the purchase price for a down payment to secure better mortgage terms.',
        'Be mindful that Homeowners Association (HOA) and condo fees may increase over time.',
        'If you have children, consider the quality of the school zone when choosing a property.',
        'Find a trustworthy and experienced realtor to guide you through the buying process.',
        // Add more points as needed
      ],
      writer: 'Shankar Pandey'
    },
    // Add more tips as needed
  ];

}
