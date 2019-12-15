import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from "@ionic/angular";

@Component({
  selector: 'app-objeto',
  templateUrl: './objeto.component.html',
  styleUrls: ['./objeto.component.scss'],
})
export class ObjetoComponent implements OnInit {

  constructor(
    private modal: ModalController,

  ) { }

  ngOnInit() {}


  closeModal() {
    this.modal.dismiss()
  }


}
