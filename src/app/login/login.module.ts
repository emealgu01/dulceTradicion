import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule, 
    ReactiveFormsModule
  ],
  declarations: [LoginPage],
  exports: [LoginPage]  // Esto es importante si el módulo es utilizado en otro lugar
})
export class LoginPageModule {}
