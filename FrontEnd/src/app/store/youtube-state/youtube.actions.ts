import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UrlData } from '../../view-models/url-data';

export const YoutubeActions = createActionGroup({
  source: 'Youtube state',
  events: {
    'Set url': props<{ url: string }>(),
    'Set data': props<{ data: UrlData }>(),
    'Error fetching data': emptyProps(),
  },
});
