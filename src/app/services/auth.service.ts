import { Injectable } from '@angular/core'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(credentials: any): Promise<any> {
    console.log(credentials, "desde el servicio");
    console.log('Correo:', credentials.email);
    console.log('Contraseña:', credentials.password);

    return new Promise((resolve, reject) => {
      // Validación del correo y la contraseña
      if (credentials.email === 'samuel@gmail.com' && credentials.password === '654321') {
        resolve('Login correcto');  // Login exitoso
      } else {
        reject('Login incorrecto');  // Login fallido
      }
    });
  }
}             
