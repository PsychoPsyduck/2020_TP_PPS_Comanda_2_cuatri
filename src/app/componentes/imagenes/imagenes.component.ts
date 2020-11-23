import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.scss'],
})
export class ImagenesComponent implements OnInit {

  @Input() mostrar:boolean; 
  @Input() user:any;
  @Output() eventoMostrarModal = new EventEmitter<boolean>();
  @Output() eventoMostrarEncuesta = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void { 

  }
 
  cerrar() 
  { 
    
    this.eventoMostrarModal.emit(false);
  }




}
