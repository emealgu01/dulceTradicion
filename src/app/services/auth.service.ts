import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlServer = 'http://51.79.26.171';
  httpHeaders = { headers: new HttpHeaders({"Content-Type": "application/json"})};
  
  constructor(
    private http: HttpClient
  ) { }

  login(credentials: any): Promise<any> {
    //console.log(credentials, "desde el servicio");
    //console.log('Correo:', credentials.email);
    //console.log('Contraseña:', credentials.password);
    return new Promise((accept, reject) => {
      // Validación del correo y la contraseña
      //if (credentials.email === 'samuel@gmail.com' && credentials.password === '654321') {
       // accept('Login correcto');  // Login exitoso
      //} else {
        //reject('Login incorrecto');  // Login fallido
      let params = {
        "user": { 
          "email": credentials.email, 
          "password": credentials.password
         }
      }
      this.http.post(`${this.urlServer}/login`, params, this.httpHeaders).subscribe(
        (data: any)=>{
          console.log(data);
          if (data.status == 'OK'){
            accept(data);
          }else{
            reject(data.errors);
          }
        },
        (error) => {
          console.log(error);
          if (error.status == 422){
            reject('Usuario o contraseña incorrectos');
          } else if (error.status == 500){
            reject('Error Porfavor intenta mas tarde');
          }else{
            reject('Error al intentar iniciar sesión');
          }
        }
      )
    });
  }
  register(data: any){
    return new Promise((accept, reject) => {
      let params = {
        "user": {
          "email": data.email,
          "password": data.password,
          "password_confirmation": data.passwordConfirmation,
          "name": data.name,
          "last_name": data.lastname,
          "username": data.username
        }
      }
      console.log(params,"params")
      this.http.post(`${this.urlServer}/signup`, params, this.httpHeaders).subscribe(
        (data: any)=>{
          console.log(data);
          if (data.status == 'OK'){
            accept(data);
          }else{
            reject(data.errors);
          }
        },
        (error) => {
          console.log(error);
          if (error.status == 422){
            reject(error.error.errors);
          } else if (error.status == 500){
            reject('Error Porfavor intenta mas tarde');
          }else{
            reject('Error al intentar registrarse');
          }
        }
      )
    });
  }
}


