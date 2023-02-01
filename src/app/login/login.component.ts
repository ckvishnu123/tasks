import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { TaskService } from '../services/task.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // need to do dependency injection to call service
  // also need to add router for redirection
  constructor(private service:TaskService, private router:Router){

  }

  // creating object of formgroup that is why new used
  loginForm = new FormGroup({
    // here the key (eg username) should match with that in backend
    // empty curly brace ("", ) if anything need inside text box add that here ""
    "username":new FormControl("", [Validators.required]),
    "password":new FormControl("", [Validators.required])
  })

  // setting getter method for validation
  // this will be used in html page

  get username(){
    // instead of self, this is used in angular
    return this.loginForm.get("username")
  }

  get password(){
    return this.loginForm.get("password")
  }
  authenticate(){
    let data = this.loginForm.value
    this.service.getToken(data).then(res=>res.json()).then(data=>{
      let token=data.token
      localStorage.setItem("token", "Token "+token)
      this.router.navigateByUrl("home")
    })
  }
}
