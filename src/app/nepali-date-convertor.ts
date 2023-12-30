import NepaliDate from 'nepali-date-converter';
import {NepaliDats} from "./nepali-dats";


export class NepaliDateConverter {
  // Define Nepali months and days
  private static nepaliMonths: string[] = [
    'Baisakh', 'Jestha', 'Ashad', 'Shrawan', 'Bhadra', 'Ashwin',
    'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'
  ];

  private static nepaliDays: string[] = [
    'Aaitabar', 'Sombar', 'Mangalbar', 'Budhbar', 'Bihibar', 'Shukrabar', 'Shanibar'
  ];
  // Define NepaliDats data with actual values
  private static nepaliDates = [
    [2000, 31, 32, 31, 30, 31, 30, 30, 30, 29, 30, 29, 31], // Example data for the year 2000
    [2001, 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 29, 30], // Example data for the year 2001
    // Add more years with their respective data
  ];


  // Method to get the number of days in a specific month of a specific year using NepaliDats
  static getDaysInMonth(year: number, month: number): number {
    try {
      return NepaliDats.getDaysInMonth(year, month);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('An unknown error occurred.');
      }
      return 0; // Handle the error gracefully or return a default value
    }
  }

  // Convert English (AD) date to Nepali (BS) date using the nepali-date-converter library
  static convertADToBS(year: number, month: number, day: number): string {
    // Initialize English Date and convert to Nepali Date
    let englishDate = new Date(year, month - 1, day);
    let nepaliDate = new NepaliDate(englishDate);

    // Directly adjust the month after conversion if necessary
    let adjustedMonth = nepaliDate.getMonth(); // +1 or -1 based on the consistent error pattern

    // Ensure adjustedMonth is within the 1-12 range
    if (adjustedMonth < 1) {
      adjustedMonth = 12;
      nepaliDate.setYear(nepaliDate.getYear() - 1);
    } else if (adjustedMonth > 12) {
      adjustedMonth = 1;
      nepaliDate.setYear(nepaliDate.getYear() + 1);
    }

    nepaliDate.setMonth(adjustedMonth);

    // Get the corrected BS date parts
    let bsYear = nepaliDate.getYear();
    let bsMonth = nepaliDate.getMonth();
    let bsDay = nepaliDate.getDate();

    return `${bsYear}-${bsMonth}-${bsDay}`;
  }

  // Convert Nepali (BS) date to English (AD) date using the nepali-date-converter library
  static convertBSToAD(bsYear: number, bsMonth: number, bsDay: number): Date {
    // Initialize the NepaliDate object with the given BS date
    let nepaliDate = new NepaliDate(bsYear, bsMonth, bsDay);

    // Convert the Nepali Date to the equivalent JavaScript Date object
    return nepaliDate.toJsDate();  // This should return the converted AD date
  }

  // Helper function to get the name of a Nepali month
  static getNepaliMonthName(month: number): string {
    if (month >= 1 && month <= 12) {
      return this.nepaliMonths[month - 1];
    }
    return 'Invalid Month';
  }

  // Helper function to get the name of a Nepali day
  static getNepaliDayName(dayOfWeek: number): string {
    if (dayOfWeek >= 0 && dayOfWeek <= 6) {
      return this.nepaliDays[dayOfWeek];
    }
    return 'Invalid Day';
  }
}
