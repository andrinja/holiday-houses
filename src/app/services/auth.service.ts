import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthService {
  constructor(private db: AngularFireDatabase,
              public afAuth: AngularFireAuth) { }

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this.afAuth.auth.signOut();
        resolve();
      }
      else{
        reject();
      }
    });
  }

  getUser() {
    return firebase.auth().currentUser;
  }
}
