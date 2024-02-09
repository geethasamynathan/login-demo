import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
interface UserDetails {
  username: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login(loginForm: any) {
    // Call the login method from the user service
    this.userService.login(loginForm.username, loginForm.password);
   console.log( loginForm.username, loginForm.password)
    // Simulate getting a session ID from the server
    const sessionId = '12';
    
    // Store the session ID in localStorage
    localStorage.setItem('sessionId', sessionId);
  
    console.log('sessionId in login' + localStorage.getItem('sessionId'));
    if (localStorage.getItem('sessionId') != null) {
      // Redirect to the dashboard page
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
