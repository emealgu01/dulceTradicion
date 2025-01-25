import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  errorMessage: any;

  // Definir los mensajes de error para cada campo, incluyendo el nuevo campo "username"
  formErrors = {
    username: [
      { type: 'required', message: 'El usuario es obligatorio' },
      { type: 'minlength', message: 'El usuario debe tener al menos 4 caracteres' }
    ],
    name: [
      { type: 'required', message: 'El nombre es obligatorio' }
    ],
    lastname: [
      { type: 'required', message: 'El apellido es obligatorio' }
    ],
    email: [
      { type: 'required', message: 'El correo es obligatorio' },
      { type: 'email', message: 'El correo no es válido' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres' }
    ],
    passwordConfirmation: [
      { type: 'required', message: 'La confirmación de la contraseña es obligatoria' },
      { type: 'passwordMismatch', message: 'Las contraseñas no coinciden' }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController
  ) {
    // Agregar "username" al formulario reactivo con validaciones
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirmation: new FormControl('', [Validators.required])
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {

  }
  registerUser(registerData: any) {
    console.log(registerData)
   this.authService.register(registerData).then(res => {
    console.log(res);
    this.errorMessage = '';
    this.navCtrl.navigateForward('/login');
  }).catch(err => {
    console.log(err);
    this.errorMessage = err;
  });
}

  // Validación de que las contraseñas coinciden
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const passwordConfirmation = formGroup.get('passwordConfirmation')?.value;
  
    // Si las contraseñas no coinciden, se debe retornar el error
    if (password !== passwordConfirmation) {
      return { passwordMismatch: true }; 
    }
    return null; 
  }

  // Obtener errores de validación
  getErrors(field: keyof typeof this.formErrors) {
    const control = this.registerForm.get(field);
    const errors = [];
    if (control?.invalid && (control?.touched || control?.dirty)) {
      for (const errorKey in control.errors) {
        const error = this.formErrors[field].find(e => e.type === errorKey);
        if (error) {
          errors.push(error.message);
        }
      }
    }
    return errors;
  }
}

