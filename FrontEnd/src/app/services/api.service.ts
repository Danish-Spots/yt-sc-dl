import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:4201/api/Download';
  constructor(private httpClient: HttpClient) {}
  public GetMetadata(url: string) {
    return this.httpClient.post(this.baseUrl + '/video-data', {
      videoUrl: url,
    });
  }
}
