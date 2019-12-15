import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {TaskI} from '../models/task.interface';
import { AngularFireAuth } from "@angular/fire/auth";
import { promise } from 'protractor';
import { Router } from "@angular/router";



export interface objeto {

  Lugar:string
  Hora:string
  Email:string
  objeto:string
  Descripcion:string
  img:string
  id:string

}




@Injectable({
  providedIn: 'root'
})



export class TodoService {

  Email:string;

  constructor(
    private AFauth : AngularFireAuth, 
    private router : Router,
    private db : AngularFirestore,
    public afs: AngularFirestore,

    
    ) { }



  getobjetos(){
    
    return this.db.collection('objetos').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a =>{
        const data = a.payload.doc.data() as objeto;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }

  addUser(Lugar,Hora,objeto,Descripcion,img,Email){

    return new Promise<any>((resolve, reject) => {
      this.afs.collection('objetos').add({
        Lugar: Lugar,
        Hora: Hora,
        Email: Email,
        nombre: objeto,
        descripcion: Descripcion,
        img : img,
        // age: parseInt("12")

      })
    })
  }

  login(email:string, password:string){

    return new Promise((resolve, rejected) =>{
      this.AFauth.auth.signInWithEmailAndPassword(email, password).then(user => {
        resolve(user);

      }).catch(err => rejected(err));
    });

   
  }

  logout(){
    this.AFauth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    })
  }
  

  registrarse(email : string, password : string, name : string){

    return new Promise ((resolve, reject) => {
      this.AFauth.auth.createUserWithEmailAndPassword(email, password).then( res =>{
          // console.log(res.user.uid);
        const uid = res.user.uid;
          this.db.collection('users').doc(uid).set({
            name : name,
            uid : uid
          })
        
        resolve(res)
      }).catch( err => reject(err))
    })
    

  }

}