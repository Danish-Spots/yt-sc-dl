export * from './soundcloud.service';
import { SoundcloudService } from './soundcloud.service';
export * from './youtube.service';
import { YoutubeService } from './youtube.service';
export const APIS = [SoundcloudService, YoutubeService];
