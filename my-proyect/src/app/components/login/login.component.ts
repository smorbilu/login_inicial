import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Login } from '../../interfaces/loginDto';


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

  // ✅ nuevo form reactivo
  loginForm: FormGroup;

  constructor(private fb: FormBuilder){
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // 🔁 mismo método login, misma lógica
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

  console.log("Usuario:", objectRequest.username);
  console.log("Password:", objectRequest.password);
  }

}
