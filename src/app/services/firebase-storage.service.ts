import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, of, from } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {
  private urlCache = new Map<string, string>();
  private requestCache = new Map<string, Observable<string>>();

  constructor(private afStorage: AngularFireStorage) {}

  /**
   * Fetches a single download URL with caching
   * @param imagePath Path to the image in Firebase Storage
   * @returns Observable<string> The download URL
   */
  getDownloadUrl(imagePath: string): Observable<string> {
    if (this.urlCache.has(imagePath)) {
      return of(this.urlCache.get(imagePath)!);
    }

    if (this.requestCache.has(imagePath)) {
      return this.requestCache.get(imagePath)!;
    }

    const imageRef = this.afStorage.ref(imagePath);
    const request$ = from(imageRef.getDownloadURL()).pipe(
      map(url => {
        this.urlCache.set(imagePath, url);
        return url;
      }),
      catchError(error => {
        console.error(`Error fetching URL for ${imagePath}:`, error);
        return of(''); // Return empty string on error
      }),
      shareReplay(1)
    );

    this.requestCache.set(imagePath, request$);
    return request$;
  }

  /**
   * Fetches multiple download URLs efficiently
   * @param imagePaths Array of paths to images in Firebase Storage
   * @returns Observable<string[]> Array of download URLs
   */
  getDownloadUrls(imagePaths: string[]): Observable<string[]> {
    const uniquePaths = [...new Set(imagePaths)]; // Remove duplicates
    const urlObservables = uniquePaths.map(path => this.getDownloadUrl(path));

    // Use forkJoin to combine all Observables into one
    return forkJoin(urlObservables).pipe(
      map(urls => urls.filter((url): url is string => url !== '' && url !== undefined)), // Type guard to ensure string[]
      catchError(error => {
        console.error('Error fetching multiple URLs:', error);
        return of([]); // Return empty array on error
      })
    );
  }

  /**
   * Clears the cache (optional, for manual control)
   */
  clearCache(): void {
    this.urlCache.clear();
    this.requestCache.clear();
  }
}
