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
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    console.log('LOGIN CLICK');

    if (this.loginForm.invalid) {
      console.log('Formulario inválido');
      return;
    }

    const data: Login = this.loginForm.value;

    const result = this.authService.login(data);

    if (result) {
      console.log('✅ Login correcto');
      alert('Login correcto');
    } else {
      console.log('❌ Credenciales incorrectas');
      alert('Usuario o contraseña incorrectos');
    }
  }

}