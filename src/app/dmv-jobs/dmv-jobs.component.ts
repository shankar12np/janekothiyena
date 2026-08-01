import {Component, OnInit} from '@angular/core';
import {JobSearchService} from "../service/job-search.service";
import {forkJoin} from "rxjs";

@Component({
    selector: 'app-dmv-jobs',
    templateUrl: './dmv-jobs.component.html',
    styleUrls: ['./dmv-jobs.component.css'],
    standalone: false
})
export class DmvJobsComponent implements OnInit{

  firstComment = 'Job Openings in Virginia ..';
  secondComment = 'Job Openings in Washington DC ....';
  thirdComment= 'Job Openings Maryland ...';

  jobListings: any[] = [];
  constructor(private jobSearchService: JobSearchService) {
  }

  ngOnInit(): void {
    this.searchJobs();
  }

  searchJobs() {
    const query = 'javascript developer';
    const locations = ['Virginia', 'Washington DC', 'Remote']; // Specify locations here
    this.jobSearchService.searchJobsInLocations(query, locations).subscribe(
      (data: any) => {
        // Assuming results are in the 'results' property
        this.jobListings = data.results;

        // Fetch full job details for each job listing
        this.fetchFullJobDetails(this.jobListings);
      },
      error => {
        console.error('Error fetching job listings:', error);
      }
    );
  }

  fetchFullJobDetails(jobListings: any[]) {
    const jobDetailRequests = jobListings
      .filter(job => job.id) // Filter out jobs with null or undefined IDs
      .map(job => this.jobSearchService.getJobDetails(job.id));

    // Use forkJoin to combine all requests and subscribe to the result
    forkJoin(jobDetailRequests).subscribe(
      (fullJobDetails: any[]) => {
        // Assign full job details to job listings
        this.jobListings.forEach((job, index) => {
          if (fullJobDetails[index]) {
            job.fullDetails = fullJobDetails[index];
          }
        });
      },
      error => {
        console.error('Error fetching full job details:', error);
      }
    );
  }

  viewDetails(jobId: string) {
    this.jobSearchService.getJobDetails(jobId).subscribe(
      (jobDetails: any) => {
        console.log('Job Details:', jobDetails);
        // Implement your logic to display the job details
      },
      error => {
        console.error('Error fetching job details:', error);
      }
    );
  }
}
