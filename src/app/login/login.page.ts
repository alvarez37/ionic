
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { TodoService  } from '../services/todo.service';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild(IonSlides , {static: false}) slides: IonSlides;
  public wavesPosition: number = 0;
  private wavesDifference: number = 100;

  constructor(
    private todoService: TodoService , 
    public router: Router
    
    ) { }
 
  LoginEmail:string;
  LoginPassword:string;

  RegisterNombre:string;
  RegisterEmail:string;
  RegisterPassword:string;


  ngOnInit() { }

  segmentChanged(event: any) {
    if (event.detail.value === 'login') {
      this.slides.slidePrev();
      this.wavesPosition += this.wavesDifference;
    } else {
      this.slides.slideNext();
      this.wavesPosition -= this.wavesDifference;
    }
  }

  login()
  {
    this.todoService.login(this.LoginEmail, this.LoginPassword).then( res =>{
      this.router.navigate(['/home']);
    }).catch(err => alert('los datos son incorrectos o no existe el usuario'))
  }

  registrarse(){
    this.todoService.registrarse(this.RegisterEmail, this.RegisterPassword,this.RegisterNombre).then( auth => {
      this.router.navigate(['home'])
      console.log(auth)
    }).catch(err => console.log(err))
  }


}
