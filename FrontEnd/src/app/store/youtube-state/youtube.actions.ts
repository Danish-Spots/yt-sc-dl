import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UrlData } from '../../view-models/url-data';
import { Metadata } from '../../view-models/metadata';

export const YoutubeActions = createActionGroup({
  source: 'Youtube state',
  events: {
    'Set url': props<{ url: string }>(),
    'Set cropped image': props<{ imageString: string }>(),
    'Set metadata': props<{ metadata: Omit<Metadata, 'image'> }>(),
    'Set data': props<{ data: UrlData }>(),
    'Set format': props<{ format: string }>(),
    'Download audio': emptyProps(),
    'Download success': emptyProps(),
    'Download error': emptyProps(),
    'Download error data passed incorrectly': emptyProps(),
    'Error fetching data': emptyProps(),
  },
});
