import { BehaviorSubject } from 'rxjs';
import { ApiConfiguration } from '../api';
import { Provider } from '@angular/core';

// Global API config
export const apiConfig: ApiConfiguration = new ApiConfiguration();

export function provideBasePath(basePath: string): void {
  apiConfig.basePath = basePath;
}

export const provideApiConfig: Provider = {
  provide: ApiConfiguration,
  useValue: apiConfig,
};
