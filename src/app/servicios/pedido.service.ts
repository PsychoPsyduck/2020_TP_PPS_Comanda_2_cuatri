import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private db: AngularFirestore) { }

  updateEstado(pedido: any, estado: number) { 
    return  this.db.collection('pedidos').doc(pedido).update({
      estado: estado,
    }) 
  }
}
 