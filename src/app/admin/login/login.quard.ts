import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class LoginGuard implements CanActivate {


  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    if (this.loginService.getCookie('auth') === 'true') {
      return true;
    } else {
      this.router.navigate(['']);
    }
  }
}
