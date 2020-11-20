import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss'],
})
export class EncuestaComponent implements OnInit {

  form: FormGroup;

  constructor(private modal: ModalController,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      atencion: ['', Validators.required],
      comida: ['', Validators.required],
      bebida: ['', Validators.required],
      consejo: ['', Validators.required]
    });
  }

  closeModal() {
    this.modal.dismiss();
  }

  cargar() {

  }
}
