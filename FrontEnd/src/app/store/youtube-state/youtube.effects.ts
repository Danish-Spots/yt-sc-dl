import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { YoutubeActions } from './youtube.actions';
import { catchError, map, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { concatLatestFrom } from '@ngrx/operators';
import { selectDownloadData } from './youtube.selectors';
import saveAs from 'file-saver';
import { YoutubeService } from '../../api';

@Injectable()
export class YoutubeEffects {
  // Have to use injection function because using constructor results in actions being undefined
  private actions$ = inject(Actions);
  private store = inject(Store);

  constructor(private ytApi: YoutubeService) {}

  setYtUrl = createEffect(() =>
    this.actions$.pipe(
      ofType(YoutubeActions.setUrl),
      switchMap(({ url }) =>
        this.ytApi.apiYoutubeYoutubeDataPost({ url }).pipe(
          map((data) =>
            YoutubeActions.setData({
              data: {
                title: data.title ?? '',
                artist: data.channel ?? '',
                image: data.thumbnail ?? '',
              },
            })
          ),
          catchError((err) => [YoutubeActions.errorFetchingData()])
        )
      )
    )
  );

  downloadYtAudio = createEffect(() =>
    this.actions$.pipe(
      ofType(YoutubeActions.downloadAudio),
      concatLatestFrom(() => this.store.select(selectDownloadData)),
      switchMap(([, { url, metadata, format }]) => {
        if (
          !metadata.title ||
          !metadata.artist ||
          !metadata.album ||
          !format ||
          !metadata.image
        )
          return [YoutubeActions.downloadErrorDataPassedIncorrectly()];
        return this.ytApi
          .apiYoutubeDownloadAudioPost({
            url,
            title: metadata.title,
            artist: metadata.artist,
            album: metadata.album,
            fileExtension: format,
            thumbnail: metadata.image,
          })
          .pipe(
            map((response: Blob) => {
              saveAs(response);
              return YoutubeActions.downloadSuccess();
            }),
            catchError(() => [YoutubeActions.downloadError()])
          );
      })
    )
  );
}
