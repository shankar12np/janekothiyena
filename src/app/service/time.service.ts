import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  /**
   * Returns the current time in Kathmandu, formatted as "HH:MM AM/PM".
   * Computed entirely client-side using the browser's Intl API — no network
   * request needed, safe to call every second without any rate-limit or
   * performance concern.
   */
  getKathmanduTime(): string {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kathmandu',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(new Date());
  }
}
