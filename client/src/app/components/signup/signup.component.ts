import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/User/user.service';
import { UserDetail } from '../../interfaces/user-detail';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastrModule, NavbarComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {

  private userService = inject(UserService);


  newUserForm = new FormGroup({
    name : new FormControl(''),
    email : new FormControl(''),
    password : new FormControl(''),
    password_confirmation : new FormControl(''),
  });

  constructor(private toastr : ToastrService){};

  onSubmit() {
    if (this.newUserForm.valid) {
      const formValues = this.newUserForm.value;

      const userData: UserDetail = {
        name: formValues.name ?? '',
        email: formValues.email ?? '',
        password: formValues.password ?? '',
        password_confirmation: formValues.password_confirmation ?? '',
      };

      this.userService.newUser(userData).subscribe({
        next: (response) => {
          console.log('Usuário criado com sucesso', response);
          this.toastr.success('Usuário criado com sucesso', 'Sucesso!', {
            positionClass: 'toast-top-center',
            progressAnimation : 'decreasing'
          }); // Exibir popup de sucesso
          this.newUserForm.reset(); // Limpar campos do formulário
        },
        error: (error) => {
          console.error('Erro ao criar usuário', error);
          this.toastr.error('Erro ao criar usuário', 'Falha',{
            positionClass: 'toast-bottom-right',
            progressAnimation : 'decreasing'
          }); // Exibir popup de erro
        }
      });
    } else {
      console.error('Formulário inválido');
    }
  }
}