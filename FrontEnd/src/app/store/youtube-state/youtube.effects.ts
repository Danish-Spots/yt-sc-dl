import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { YoutubeActions } from './youtube.actions';
import { catchError, map, switchMap } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { createFeature, Store } from '@ngrx/store';
import { concatLatestFrom } from '@ngrx/operators';
import { selectDownloadData, selectMetadata } from './youtube.selectors';
import saveAs from 'file-saver';

@Injectable()
export class YoutubeEffects {
  // Have to use injection function because using constructor results in actions being undefined
  private actions$ = inject(Actions);
  private store = inject(Store);

  constructor(private ytApi: ApiService) {}

  setYtUrl = createEffect(() =>
    this.actions$.pipe(
      ofType(YoutubeActions.setUrl),
      switchMap(({ url }) =>
        this.ytApi.GetMetadata(url).pipe(
          map((data: any) =>
            YoutubeActions.setData({
              data: {
                title: data.title,
                artist: data.channel,
                image: data.thumbnailUrl,
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
        if (!metadata.title || !metadata.artist || !format || !metadata.image)
          return [YoutubeActions.downloadErrorDataPassedIncorrectly()];
        return this.ytApi
          .DownloadAudio(
            url,
            metadata.title,
            metadata.artist,
            format,
            metadata.image
          )
          .pipe(
            map((response: Blob) => {
              saveAs(response);
              return YoutubeActions.downloadSuccess();
            })
          );
      })
    )
  );
}
