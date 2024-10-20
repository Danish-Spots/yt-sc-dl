import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { YoutubeActions } from './youtube.actions';
import { catchError, map, switchMap } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Injectable()
export class YoutubeEffects {
  // Have to use injection function because using constructor results in actions being undefined
  private actions$ = inject(Actions);

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
}
