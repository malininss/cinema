import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;

  constructor(
    private loginService: LoginService,
    private router: Router
    ) { }

  ngOnInit() {
    if (this.loginService.getCookie('auth') === 'true') {
      this.router.navigate(['admin']);
    }

    this.loginFormGroup = new FormGroup({
      email: new FormControl('', Validators.email),
      pwd: new FormControl('', Validators.minLength(5))
    });
  }

  loginSubmit() {
    this.loginService.login({...this.loginFormGroup.value})
      .subscribe(
      response => {
        document.cookie = 'auth=true';
        this.router.navigate(['admin']);
      },
      error => {
        document.querySelector('.notice').textContent = 'Неправильный логин или пароль';
      });
  }
}
