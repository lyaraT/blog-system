import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import {NgxUiLoaderConfig, NgxUiLoaderModule, PB_DIRECTION, POSITION, SPINNER} from "ngx-ui-loader";
import {AuthGuard} from "./core/gaurds/auth.gaurd";
import {provideFirebaseApp, initializeApp} from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage'

registerLocaleData(en);

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'blue',
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 40,
  bgsType: SPINNER.ballScaleMultiple,
  fgsType: SPINNER.threeStrings,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 5,
};
const firebaseConfig = {
  apiKey: "AIzaSyASWmkZCGx2jJoms3Hdx6RGLF5AEaOLrhI",
  authDomain: "blogsystem-db548.firebaseapp.com",
  projectId: "blogsystem-db548",
  storageBucket: "blogsystem-db548.appspot.com",
  messagingSenderId: "6380604495",
  appId: "1:6380604495:web:4a579146f3ed475846ee3a"
};
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideNzI18n(en_US), importProvidersFrom(FormsModule), provideAnimationsAsync(), importProvidersFrom([
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideStorage(() => getStorage())
  ]), provideHttpClient(),NgxUiLoaderModule.forRoot(ngxUiLoaderConfig).ngModule,AuthGuard,],
};
