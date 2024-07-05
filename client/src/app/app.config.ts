import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { JWT_OPTIONS, JwtHelperService, JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('token');
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideClientHydration(), 
    provideHttpClient(withInterceptors([AuthInterceptor]), withFetch()), 
    provideAnimations(), 
    provideToastr(),
    importProvidersFrom(JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: () => {
          return {
            tokenGetter: tokenGetter,
            allowedDomains: ['localhost:3000'], // Adicione os domínios permitidos aqui
            disallowedRoutes: ['http://localhost:3000/api/auth'], // Adicione as rotas que não devem incluir o token aqui
          };
        },
      },
    })),
    JwtHelperService, // Registre o JwtHelperService como um provedor
  ]
};
