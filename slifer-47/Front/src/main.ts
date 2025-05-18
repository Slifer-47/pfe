import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { JwtInterceptor } from './app/core/interceptors/jwt.interceptor';


bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),{
      provide:HTTP_INTERCEPTORS,
      useClass:JwtInterceptor,
      multi:true
    },
    provideRouter(routes)
  ]
}).catch(err => console.error(err));