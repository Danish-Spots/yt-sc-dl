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

  public DownloadAudio(
    url: string,
    title: string,
    channel: string,
    fileExtension: string,
    image: string
  ) {
    return this.httpClient.post(
      this.baseUrl + '/download-audio',
      {
        videoUrl: url,
        title,
        channel,
        fileExtension,
        image,
      },
      {
        responseType: 'blob',
      }
    );
  }
}

// best -> best.opus
// aac -> m4a
// alac -> m4a
// flac -> flac
// m4a -> m4a (windows is file)
// mp3 -> mp3
// opus -> opus (windows is file)
// vorbis -> ogg
// wav -> wav
