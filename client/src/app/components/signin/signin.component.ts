import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LoginService } from '../../services/login.service';
import { LoginDetail } from '../../interfaces/login-detail';
import { LocalService } from '../../services/local.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  private loginService = inject(LoginService);
  private localService = inject(LocalService);

  loginForm = new FormGroup({
    email : new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;

      const loginData: LoginDetail = {
        email: formValues.email ?? '',
        password: formValues.password ?? '',
      };

      this.loginService.newLogin(loginData).subscribe({
        next: (response : any) => {
          console.log(response);
          const token = response.token; 
          if (token) {
            this.localService.saveData('token', token); 
          }
          this.loginForm.reset(); 
        },
        error: (error) => {
          console.error('Erro ao fazer login', error);
        }
      });
    } else {
      console.error('Formulário inválido');
    }
  }
}