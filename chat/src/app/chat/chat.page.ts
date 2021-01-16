import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { FirebaseService } from '../services/firebase.service';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import firebase from 'firebase';

import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  userEmail: string;
  uid: any;
  message: any;

  chats: any = [];
  tmpImage: any = undefined;

  imageName = Math.floor( Math.random() * 1000 );

  encryptedText = '';

  decryptedText = '';

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private firebaseSrv: FirebaseService,
    private actionSheetController: ActionSheetController,
    private camera: Camera
  ) { }

  ngOnInit() {
    this.authService.userDetails().subscribe( res => {

      if ( res !== null ) {
        this.userEmail = res.email;
        this.uid = res.uid;
      } else {
        this.navCtrl.navigateBack( '' );
      }
    }, err => {
      console.log( 'err', err );
    } );
    this.firebaseSrv.getMessages().on( 'value', ( messageSnap ) => {
      this.chats = [];
      const key = '';
      messageSnap.forEach( ( messageData ) => {

        if (messageData.val().message){
          this.decryptText( messageData.val().message );
          this.chats.push( {
            uid: messageData.val().uid,
            email: messageData.val().email,
            message: this.decryptedText,
            time: messageData.val().time,
          } );
        } else {
          this.decryptText( messageData.val().image );
          this.chats.push( {
            uid: messageData.val().uid,
            email: messageData.val().email,
            imagePhoto: this.decryptedText,
            time: messageData.val().time,
          } );
        }

      } );
    } );
  }


  takePhoto( sourceType ) {
    try {
      const options: CameraOptions = {
        quality: 50,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        sourceType
      };

      this.camera.getPicture( options )
        .then( async ( imageData ) => {
          this.tmpImage = 'data:image/jpeg;base64,' + imageData;
          const putPictures = firebase.storage().ref( 'imagesMessage/' + this.imageName + '.jpeg' );
          putPictures.putString( this.tmpImage, 'data_url' ).then( ( snapshot ) => {
            console.log( 'snapshot', snapshot.ref );
          } );
          const getPicture = firebase.storage().ref( 'imagesMessage/' + this.imageName + '.jpeg' ).getDownloadURL();
          getPicture.then( ( url ) => {
            this.message = url;
            console.log('OJO', url);
          } );
        } )
        .catch( ( e ) => {
          console.log( e );
          this.tmpImage = undefined;
        } );
    } catch ( e ) {
      console.log( e );
      this.tmpImage = undefined;
    }
  }

  async presentActionSheetCamera() {
    const actionSheet = await this.actionSheetController.create( {
      buttons: [
        {
          text: 'Cámara',
          handler: () => {
            this.takePhoto( this.camera.PictureSourceType.CAMERA );
          }
        }, {
          text: 'Ver imágenes guardadas',
          handler: () => {
            this.takePhoto( this.camera.PictureSourceType.PHOTOLIBRARY );
          }
        }, {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    } );
    await actionSheet.present();
  }

  encryptText( text ) {
    this.encryptedText = CryptoJS.AES.encrypt( text, '#theKey#', '#theKey#' ).toString();
  }


  decryptText( text ) {
    this.decryptedText = CryptoJS.AES.decrypt( text, '#theKey#', '#theKey#' )
      .toString( CryptoJS.enc.Utf8 );
  }
  async sendMessage() {
    let messageToSend = {};
    this.encryptText( this.message );
    if ( this.tmpImage !== undefined ) {
      messageToSend = {
        uid: this.uid,
        imagePhoto: this.encryptedText,
        email: this.userEmail,
        time: Date.now()
      };
    } else {
      messageToSend = {
        uid: this.uid,
        message:  this.encryptedText,
        email: this.userEmail,
        time: Date.now()
      };
    }
    try {
      await this.firebaseSrv.sendMessage( messageToSend );
      this.message = '';
    } catch ( e ) {
      console.log( 'error', e );
    }
  }

  logout() {
    this.authService.logoutUser()
      .then( res => {
        console.log( res );
        this.navCtrl.navigateBack( '' );
      } )
      .catch( error => {
        console.log( error );
      } );
  }

}
