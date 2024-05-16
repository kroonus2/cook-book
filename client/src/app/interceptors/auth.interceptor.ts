import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalService } from '../services/LocalStorage/local.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const localService = inject(LocalService);
  const platformId = inject(PLATFORM_ID);
  const jwtHelper = inject(JwtHelperService);

  let token = null;

  if (isPlatformBrowser(platformId)) {
    token = localService.isLogged();
  }

  if (token && !jwtHelper.isTokenExpired(token)) {
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(clonedReq);
  }else{
    localService.removeData('token');
    return next(req);
  }
  
};
