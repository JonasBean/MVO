import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import * as firebase from 'firebase/app';
import { FirebaseService } from './firebase.service';

@Injectable()
export class AuthService {

  constructor(
    private firebaseService: FirebaseService
  ){}

  doRegister(value){
   return firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
    .then(() => {
            let user = firebase.auth().currentUser;
            user.sendEmailVerification();
            alert("Account wurde erstellt - Bitte noch Email Adresse bestätigen.");
        }).catch((error) => {
            console.log('Error: ' + error);
        });
  }

  doLogin(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().signInWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        firebase.auth().signOut()
        .then(() => {
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }
}
