import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Login } from '../../interfaces/loginDto';
import { AuthService } from '../../services/auth.service';   

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService   
  ){
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(){

    if(this.loginForm.invalid){

      Object.keys(this.loginForm.controls).forEach(field=>{
        const control = this.loginForm.get(field);

        if(control?.invalid){
          console.error(`Campo obligatorio: ${field}`);
        }
      });

      return;
    }

    const objectRequest: Login = this.loginForm.value;

    this.authService.login(objectRequest).subscribe({
      next: (res) => {
        console.log('Login OK:', res);

        
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res));

        
      },
      error: (err) => {
        console.error('Error login:', err.message);
      }
    });

  }
}