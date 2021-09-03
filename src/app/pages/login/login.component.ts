import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import {  ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    })
  }
  login(){
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe((res)=>{
        if(res.meta.success){
          localStorage.setItem("token", res.data.token)
          this.router.navigate(['stock'])
          this.toastr.success("Login succeeded", "Login")
        }
        else{
        this.toastr.error("Login failed", "Login")
        }
      },
      (err)=>{
        this.toastr.error("Login failed", "Login")
      })
    }
    else{
      this.toastr.error("Please fill the fields properly", "Login")
    }
  }
}
