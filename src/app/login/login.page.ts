import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  errorMessage: any;

  // Errores de validación para el correo
  emailErrors = {
    email: [
      { type: 'required', message: 'El correo es obligatorio' },
      { type: 'email', message: 'El correo no es válido' }
    ]
  };

  // Errores de validación para la contraseña
  passwordErrors = [
    { type: 'required', message: 'La contraseña es obligatoria' },
    { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private storage: Storage
  
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
    });
  }

  ngOnInit() {
  }

  // AGREGADO: METODO PARA MANEJAR EL ENVÍO DEL FORMULARIO
  loginUser(credentials: any) {
    this.authService.login(credentials).then((res: any) => {
      console.log(res);  // Login exitoso
      this.errorMessage = '';
      this.storage.set('user', res.user);
      this.storage.set('isUserLoggedIn', true);
      this.navCtrl.navigateForward('/menu/home');
    }).catch(error => {
      console.error(error);  // Login fallido
      this.errorMessage = error;
    });
  }
}