import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationItem } from './theme/layout/admin/navigation/navigation';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '@ui-core/interceptors/auth.interceptor';
import { ErrorInterceptor } from '@ui-core/interceptors/error.interceptor';
import { AuthGuard } from '@ui-core/guards/auth.guard';
import { PagesModule } from './pages/pages.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PagesModule,
    ToastrModule.forRoot({
      closeButton: true,
      newestOnTop: true,
      progressBar: true,
      positionClass: 'toast-top-right',
      timeOut: 12000,
      extendedTimeOut: 10000
    })
  ],
  providers: [
    NavigationItem,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
