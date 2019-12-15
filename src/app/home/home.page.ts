import { Component, OnInit } from '@angular/core';
import {TaskI} from '../models/task.interface';
import {TodoService, objeto} from '../services/todo.service';
import { ModalController } from "@ionic/angular";

import { ObjetoComponent } from "../cpmponentes/objeto/objeto.component";
import { AddComponent } from "../cpmponentes/add/add.component";
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{


  public objetos :any = [];

  constructor(
    private storage: AngularFireStorage, 
    private database: AngularFirestore,private modal : ModalController,
    public todoService:TodoService
    ) {

  }


    ngOnInit(){

      this.todoService.getobjetos().subscribe( objeto => {
        
      this.objetos = objeto;
        
      })
    }
  

    openobjeto(objeto){

      this.modal.create({
        component: ObjetoComponent,
        componentProps : {
          objeto: objeto
        }
      }).then( (modal) => modal.present())
    }

    openadd(){

      this.modal.create({
        component: AddComponent,
        componentProps : {
        }
      }).then( (modal) => modal.present())
    }


    Onlogout(){
      this.todoService.logout();
    }

    
  }
  




