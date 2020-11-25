import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  dbPedidosRef:AngularFirestoreCollection<any>;
  
  constructor(private db: AngularFirestore) {
    this.dbPedidosRef = this.db.collection("pedidos");
   }

  updateEstado(pedido: any, estado: number) { 
    return  this.db.collection('pedidos').doc(pedido).update({
      estado: estado,
    }) 
  }

  updateDescuento(pedido: any, descuento: number) { 
    return  this.db.collection('pedidos').doc(pedido).update({
      descuento: descuento,
    }) 
  }

  updateEncuesta(pedido: any, estado: number) { 
    return  this.db.collection('pedidos').doc(pedido).update({
      estado: estado,
    }) 
  }

  pedirCuenta(pedido: any, propina: string, subtotal: number) { 
    return  this.db.collection('pedidos').doc(pedido).update({
      estado: 5,
      propina: propina,
      subtotal: subtotal
    }) 
  }
  // getPedido(uid: string) {
  //   return new Promise ((resolve, rejects) => { 
  //     this.getPedidoUser(uid).subscribe(res => {
  //       let respuesta:any []= res;
  //       let doc = respuesta.filter(x => x.usuario.uid == uid && x.estado != 9);
  //       resolve(doc);
  //     })
  //   })
  // }

  getPedidoUser() {
    return this.db.collection('pedidos').valueChanges();
  }

  getPedido(uid: string) {
    return this.dbPedidosRef.doc(uid).valueChanges();
  }

  agregarEncuesta(pedido: string, encuesta: string) { 
    return  this.db.collection('pedidos').doc(pedido).update({
      encuesta: encuesta,
    }) 
  }
}