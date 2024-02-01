import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void { }
  doSomething() {
    if (this.loginForm.valid) {
      this.router.navigateByUrl('/inicio');
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  get username() {
    return this.loginForm.controls.username;
  }
  get password() {
    return this.loginForm.controls.password;
  }
}
