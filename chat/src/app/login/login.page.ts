import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AuthenticateService } from '../services/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Component( {
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: [ './login.page.scss' ],
} )
export class LoginPage implements OnInit {

  validationsForm: FormGroup;
  errorMessage = '';
  validationMessages = {
    email: [
      {
        type: 'required',
        message: 'El email es obligatorio'
      },
      {
        type: 'pattern',
        message: 'Por favor ingresa un email válido'
      }
    ],
    password: [
      {
        type: 'required',
        message: 'La contraseña es obligatoria'
      },
      {
        type: 'minlength',
        message: 'La contraseña debe contener al menos 5 caracteres'
      }
    ]
  };

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {

    this.validationsForm = this.formBuilder.group( {
      email: new FormControl( '', Validators.compose( [
        Validators.required,
        Validators.pattern( '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$' )
      ] ) ),
      password: new FormControl( '', Validators.compose( [
        Validators.minLength( 5 ),
        Validators.required
      ] ) ),
    } );
  }

  loginUser( value ) {
    this.authService.loginUser( value )
      .then( res => {
        console.log( res );
        this.errorMessage = '';
        this.navCtrl.navigateForward( '/chat' );
      }, err => {
        this.errorMessage = err.message;
      } );
  }

  // async loginGoogle() {
  //   const res = await this.afAuth.signInWithPopup( new firebase.auth.GoogleAuthProvider() )
  //     .then( result => {
  //       console.log( result );
  //       this.errorMessage = '';
  //       this.navCtrl.navigateForward( '/dashboard' );
  //     }, err => {
  //       this.errorMessage = err.message;
  //     } );
  // }

  goToRegisterPage() {
    this.navCtrl.navigateForward( '/register' );
  }

}
