export class NepaliDats {
  // Add the provided nepaliDates object here
  private static yearMonthDaysMapping: { [year: number]: number[] } = {
    2000: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2001: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2002: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2003: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2004: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2005: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2006: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2007: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2008: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
    2009: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2010: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2011: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2012: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    2013: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2014: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2015: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    2016: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2017: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    2018: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2019: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2020: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2021: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2022: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2023: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2024: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2025: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2026: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2027: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    2028: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2029: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2030: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2031: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2032: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2033: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2034: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2035: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2036: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2037: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    2038: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2039: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2040: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2041: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2042: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2043: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2044: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2045: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2046: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2047: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    2048: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2049: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2050: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2051: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2052: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2053: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2054: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2055: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2056: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2057: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    2058: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2059: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2060: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2061: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2062: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2063: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2064: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2065: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2066: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2067: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],//checked from bellow
    2068: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2069: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2070: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]

  };
  public static getDaysInMonth(year: number, month: number): number {
    const yearData = this.yearMonthDaysMapping[year];
    if (!yearData) {
      throw new Error("Data not available for the specified year.");
    }

    if (month < 1 || month > 12) {
      throw new Error("Invalid month. Month must be between 1 and 12.");
    }

    return yearData[month - 1]; // -1 because array indexes start at 0
  }

  // Add methods to get the current BS date

  public static getCurrentBSDate(): [number, number, number] {
    // Assume this method returns the current BS date as [year, month, day]
    // For example, it might return [2078, 4, 31]
    return [2078, 4, 31]; // This should be replaced with actual current BS date logic
  }

  public static getCurrentBSYear(): number {
    const [year, , ] = this.getCurrentBSDate(); // Destructure to get the year
    return year;
  }

  public static getCurrentBSMonth(): number {
    const [, month, ] = this.getCurrentBSDate(); // Destructure to get the month
    return month;
  }

  public static getCurrentBSDay(): number {
    const [, , day] = this.getCurrentBSDate(); // Destructure to get the day
    return day;
  }


  public static getDaysInYear(year: number): number[] {
    const yearData = this.yearMonthDaysMapping[year];
    if (yearData) {
      return yearData;
    } else {
      throw new Error("Year out of range. No data available for the specified year.");
    }
  }
  // Converts a Gregorian date to a BS date
  public static convertToBS(gregorianDate: Date): { year: number, month: number, day: number } {
    const year = gregorianDate.getFullYear();
    const month = gregorianDate.getMonth() + 1; // JavaScript months are 0-indexed
    const day = gregorianDate.getDate();

    const yearData = this.yearMonthDaysMapping[year];

    if (!yearData) {
      throw new Error("Data not available for the specified year.");
    }

    let bsYear = year + 57; // Convert Gregorian year to Bikram Sambat
    let bsMonth = 1; // Start with the first month of Bikram Sambat
    let bsDay = day;

    for (let i = 0; i < month - 1; i++) {
      bsDay += yearData[i];
      bsMonth++;
    }

    return { year: bsYear, month: bsMonth, day: bsDay };
  }

  // Converts a BS date to a Gregorian date
  public static convertToAD(bsYear: number, bsMonth: number, bsDay: number): Date {
    const yearData = this.yearMonthDaysMapping[bsYear - 57];

    if (!yearData) {
      throw new Error("Data not available for the specified year.");
    }

    let adYear = bsYear - 57; // Convert Bikram Sambat year to Gregorian
    let adMonth = 1; // Start with the first month of Gregorian
    let adDay = bsDay;

    for (let i = 0; i < bsMonth - 1; i++) {
      adDay -= yearData[i];
      adMonth++;
    }

    return new Date(adYear, adMonth - 1, adDay); // Subtract 1 from adMonth to adjust for 0-indexed months
  }
}




