import { Component, OnInit } from '@angular/core';
import {TodoService} from '../../services/todo.service';


import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { NavParams, ModalController } from "@ionic/angular";


export interface MyData {
  name: string;
  filepath: string;
  size: number;
}


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  image: string

  public objetos :any = [];

  // Upload Task 
  task: AngularFireUploadTask;
 
  // Progress in percentage
  percentage: Observable<number>;
 
  // Snapshot of uploading file
  snapshot: Observable<any>;
 
  // Uploaded File URL
  UploadedFileURL: Observable<string>;
 
  //Uploaded Image List
  images: Observable<MyData[]>;
 
  //File details  
  fileName:string;
  fileSize:number;
 
  //Status check 
  isUploading:boolean;
  isUploaded:boolean;
 
  private imageCollection: AngularFirestoreCollection<MyData>;
  constructor(
    private camera: Camera,
    private modal: ModalController,

    public todoService:TodoService,
    private storage: AngularFireStorage, 
    private database: AngularFirestore,

  ) {
    this.isUploading = false;
    this.isUploaded = false;
    //Set collection where our documents/ images info will save
    this.imageCollection = database.collection<MyData>('images');
    this.images = this.imageCollection.valueChanges(); 
  }

  ngOnInit() {}

  Lugar:string="";
  Hora:string="";
  objeto:string="";
  Descripcion:string="";
  img:string="";
  Email:string="";

  sendMessage(){
    
    this.Hora=new Date().toISOString();
    this.Hora = this.Hora.substring(0, 10);
    this.Hora+= "   -   " +  new Date().getHours() + " : " + new Date().getMinutes();

    this.todoService.addUser(this.Lugar,this.Hora,this.objeto,this.Descripcion,this.img, this.Email );
    this.Lugar='';
    this.Hora='';
    this.objeto='';
    this.Descripcion='';
    this.img='';
    this.image='';

  }


  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      //destinationType: this.camera.DestinationType.FILE_URI,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.camera.getPicture(options)
    .then((imageData) => {
      //this.image = this.webView.convertFileSrc(imageData);
      this.image = 'data:image/jpeg;base64,'+imageData;


      const filePath = `my-pet-crocodile_${ new Date().getTime() }.jpg`;
    
      this.task = this.storage.ref(filePath).putString(this.image, 'data_url');
    
      const fileRef = this.storage.ref(filePath);
      
      // Get file progress percentage
      this.percentage = this.task.percentageChanges();
      
    
      this.task.snapshotChanges().pipe(
        
        finalize(() => {
          // Get uploaded file storage path
          console.log("Finalizo la carga");
          this.UploadedFileURL = fileRef.getDownloadURL();
          this.UploadedFileURL.subscribe(resp=>{
            console.log(resp);
            this.img = resp;
  

          },error=>{
            console.error(error);
          })
        }),
        tap(snap => {
            console.log(snap.totalBytes);
            this.fileSize = snap.totalBytes;
        }),
      ).subscribe();
  

    }, (err) => {
      console.log(err);
    });
  }

  closeModal() {
    this.modal.dismiss()
  }

}


