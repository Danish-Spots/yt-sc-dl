import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScMetadataDto } from '../models/sc-metadata-dto';
import { MetadataRequest } from '../../view-models/metadata-request';
import { MetadataRequestDto } from '../models/metadata-request-dto';
import { ScDownloadRequestDto } from '../models/sc-download-request-dto';

@Injectable({
  providedIn: 'root',
})
export class ScService {
  private baseUrl = 'https://localhost:4233/api/Soundcloud';
  constructor(private httpClient: HttpClient) {}

  public GetMetadata(url: string) {
    const body: MetadataRequestDto = {
      url,
    };
    return this.httpClient.post<ScMetadataDto>(
      this.baseUrl + '/soundcloud-data',
      body
    );
  }

  public DownloadAudio(body: ScDownloadRequestDto) {
    return this.httpClient.post(this.baseUrl + '/download-audio', body, {
      responseType: 'blob',
    });
  }
}
