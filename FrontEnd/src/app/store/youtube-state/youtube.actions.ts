import { createActionGroup, props } from '@ngrx/store';

export const YoutubeActions = createActionGroup({
  source: 'Youtube state',
  events: {
    'Set url': props<{ url: string }>(),
  },
});
