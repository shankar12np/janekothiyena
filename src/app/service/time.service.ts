import { Injectable } from '@angular/core';

export interface ClockAngles {
  hourDeg: number;
  minuteDeg: number;
  secondDeg: number;
}

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

  /**
   * Returns rotation angles (in degrees) for an analog clock's hour, minute,
   * and second hands, based on the current time in Kathmandu. 0deg points
   * straight up (12 o'clock), matching standard CSS transform-origin usage
   * for a clock face.
   */
  getKathmanduClockAngles(): ClockAngles {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kathmandu',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23'
    }).formatToParts(new Date());

    const hours = Number(parts.find(p => p.type === 'hour')?.value ?? 0);
    const minutes = Number(parts.find(p => p.type === 'minute')?.value ?? 0);
    const seconds = Number(parts.find(p => p.type === 'second')?.value ?? 0);

    const secondDeg = seconds * 6;
    const minuteDeg = minutes * 6 + seconds * 0.1;
    const hourDeg = (hours % 12) * 30 + minutes * 0.5;

    return { hourDeg, minuteDeg, secondDeg };
  }
}
