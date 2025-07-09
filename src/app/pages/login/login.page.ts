import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {IonicModule, AlertController } from '@ionic/angular';
import {Auth, signInWithEmailAndPassword} from '@angular/fire/auth'
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule,FormsModule,RouterModule]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router,
    private alertCtrl: AlertController
  ) { 
    this.loginForm = fb.group({
      email: [''],
      password: ['']
    })
  }

  async login(){
    const {email,password} = this.loginForm.value
    try{
      await signInWithEmailAndPassword(this.auth,email,password)
      this.router.navigateByUrl('/journal-list')
    } catch(error: any){
      const alert= await this.alertCtrl.create({
        header:'Login failed',
        message: error.message,
        buttons: ['OK'],
      })
      await alert.present()
    }
  }

  goToForgotPassword(){
    this.router.navigateByUrl('/forgot-password')
  }

  goToRegister(){
    this.router.navigateByUrl('/register')
  }


  ngOnInit() {
  }

}
