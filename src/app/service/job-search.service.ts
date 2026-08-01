import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {forkJoin, Observable, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JobSearchService {
  private apiUrl = 'http://api.adzuna.com/v1/api/jobs/gb/search/1';
  private appId = 'd38ea41f';
  private appKey = '524837100afac1067e66d87856aafb73';

  constructor(private http: HttpClient) { }

  searchJobs(query: string): Observable<any> {
    const url = `${this.apiUrl}?app_id=${this.appId}&app_key=${this.appKey}&results_per_page=20&what=${query}&content-type=application/json`;
    return this.http.get(url).pipe(
      switchMap((response: any) => {
        // Extract job IDs from the initial response
        const jobIds = response.results.map((job: any) => job.id);

        // Fetch full job details for each job ID
        const jobDetailRequests = jobIds.map((id: string) => {
          return this.http.get(`${this.apiUrl}/${id}?app_id=${this.appId}&app_key=${this.appKey}`);
        });

        // Combine all requests and return as a single observable
        return forkJoin(jobDetailRequests);
      })
    );
  }


  searchJobsInLocations(query: string, locations: string[]): Observable<any> {
    const locationQuery = locations.join(','); // Join locations with comma separator
    const url = `${this.apiUrl}?app_id=${this.appId}&app_key=${this.appKey}&results_per_page=20&what=${query}&where=${locationQuery}&content-type=application/json`;
    return this.http.get(url);
  }

  getJobDetails(jobId: string): Observable<any> {
    const url = `${this.apiUrl}/${jobId}?app_id=${this.appId}&app_key=${this.appKey}&content-type=application/json`;
    return this.http.get(url);
  }

}
