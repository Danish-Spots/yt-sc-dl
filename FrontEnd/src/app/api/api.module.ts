import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { ApiConfiguration } from './configuration';
import { HttpClient } from '@angular/common/http';


@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class ApiApiModule {
    public static forRoot(configurationFactory: () => ApiConfiguration): ModuleWithProviders<ApiApiModule> {
        return {
            ngModule: ApiApiModule,
            providers: [ { provide: ApiConfiguration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
