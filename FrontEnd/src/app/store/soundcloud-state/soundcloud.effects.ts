import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { concatLatestFrom } from '@ngrx/operators';
import saveAs from 'file-saver';
import { SoundcloudActions } from './soundcloud.actions';
import { SoundcloudSelectors } from './soundcloud.selectors';
import { ScMetadataDto, SoundcloudService } from '../../api';

@Injectable()
export class SoundcloudEffects {
  // Have to use injection function because using constructor results in actions being undefined
  private actions$ = inject(Actions);
  private store = inject(Store);
  private service = inject(SoundcloudService);

  setScUrl = createEffect(() =>
    this.actions$.pipe(
      ofType(SoundcloudActions.setUrl),
      switchMap(({ url }) =>
        this.service.apiSoundcloudSoundcloudDataPost({ url }).pipe(
          map((data: ScMetadataDto) =>
            SoundcloudActions.setData({
              data: {
                title: data.title ?? '',
                artist: data.uploader ?? '',
                image: data.thumbnail ?? '',
                images: data.thumbnails ?? [],
              },
            })
          ),
          catchError((err) => [SoundcloudActions.errorFetchingData()])
        )
      )
    )
  );

  downloadScAudio = createEffect(() =>
    this.actions$.pipe(
      ofType(SoundcloudActions.downloadAudio),
      concatLatestFrom(() =>
        this.store.select(SoundcloudSelectors.selectDownloadData)
      ),
      switchMap(([, { url, metadata }]) => {
        if (
          !metadata.title ||
          !metadata.artist ||
          !metadata.image ||
          !metadata.album
        )
          return [SoundcloudActions.downloadErrorDataPassedIncorrectly()];
        return this.service
          .apiSoundcloudDownloadAudioPost({
            url,
            title: metadata.title,
            album: metadata.album,
            artist: metadata.artist,
            thumbnail: metadata.image,
          })
          .pipe(
            map((response: Blob) => {
              saveAs(response);
              return SoundcloudActions.downloadSuccess();
            }),
            catchError(() => [SoundcloudActions.downloadError()])
          );
      })
    )
  );
}
