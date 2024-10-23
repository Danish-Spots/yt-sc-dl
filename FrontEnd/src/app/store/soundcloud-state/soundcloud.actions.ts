import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Metadata } from '../../view-models/metadata';
import { UrlData } from '../../view-models/url-data';

export const SoundcloudActions = createActionGroup({
  source: 'Soundcloud state',
  events: {
    'Set url': props<{ url: string }>(),
    'Add image': props<{ imageUrl: string }>(),
    'Set image': props<{ imageUrl: string }>(),
    'Set metadata': props<{ metadata: Omit<Metadata, 'image'> }>(),
    'Set data': props<{ data: UrlData }>(),
    'Download audio': emptyProps(),
    'Download success': emptyProps(),
    'Download error': emptyProps(),
    'Download error data passed incorrectly': emptyProps(),
    'Error fetching data': emptyProps(),
  },
});
