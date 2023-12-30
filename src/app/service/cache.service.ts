import { Injectable } from '@angular/core';
import {timer} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CacheService<T> {

  private cache: { [key: string]: { data: T; timestamp: number } } = {};
  private cleanupInterval = 86400000; // 24 hours in milliseconds

  constructor() {
    // Periodically clean up expired entries using RxJS timer
    timer(this.cleanupInterval, this.cleanupInterval).subscribe(() => {
      this.cleanupCache();
    });
  }

  set(key: string, data: T) {
    this.cache[key] = {
      data,
      timestamp: new Date().getTime()
    };
  }

  get(key: string, maxAgeMs: number): T | null {
    const entry = this.cache[key];
    if (!entry || (new Date().getTime() - entry.timestamp > maxAgeMs)) {
      // Cache miss or data has expired
      this.remove(key); // Remove the expired entry
      return null;
    }
    return entry.data;
  }

  remove(key: string) {
    delete this.cache[key];
  }

  cleanupCache() {
    const currentTime = new Date().getTime();
    for (const key in this.cache) {
      if (Object.prototype.hasOwnProperty.call(this.cache, key)) {
        if (currentTime - this.cache[key].timestamp > this.cleanupInterval) {
          this.remove(key); // Remove expired entries
        }
      }
    }
  }

  // Manual invocation of cache cleanup, if needed externally
  public manualCleanup() {
    this.cleanupCache();
  }
}
