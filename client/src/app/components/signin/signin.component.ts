import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/Auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { LoginDetails } from '../../interfaces/user-detail';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, NavbarComponent],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private authService = inject(AuthService);

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;

      const loginData: LoginDetails = {
        email: formValues.email ?? '',
        password: formValues.password ?? '',
      };

      this.authService.newLogin(loginData).subscribe({
        next: () => {
          this.toastr.success('Login realizado com sucesso!', 'Sucesso');
          this.router.navigate(['/user']); // Redirecionar após login
          this.loginForm.reset();
        },
        error: () => {
          this.toastr.error('Erro ao fazer login', 'Erro');
        }
      });
    } else {
      this.toastr.error('Formulário inválido', 'Erro');
    }
  }
}
