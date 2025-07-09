import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import {IonicModule} from '@ionic/angular'
import { ReactiveFormsModule, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegisterPage implements OnInit {

  registerForm!: FormGroup
  constructor(private fb: FormBuilder, private auth: Auth, 
    private router: Router
  ) { }

  async register(){
    const {email,password} = this.registerForm.value
    if(!email || !password) return
    try{
      await
      createUserWithEmailAndPassword(this.auth,email,password)
      this.router.navigateByUrl('/journal-list')
    } catch(error){
      console.error('Registration failed: ',error)
      alert('Registration failed')
    }
  }

  passwordMatchValidator: ValidatorFn =(formGroup: AbstractControl):ValidationErrors | null =>{
    const password = formGroup.get('password')?.value
    const confirmPassword = formGroup.get('confirmPassword')?.value
    return password === confirmPassword ? null: {mismatch: true}
  }
  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ["", [Validators.required,Validators.email]],
      password: ["",Validators.required],
      confirmPassword: ["",Validators.required]
    },
    {validators: this.passwordMatchValidator}
  )
  }

  goToLogin(){
    this.router.navigateByUrl('/login')
  }

}
