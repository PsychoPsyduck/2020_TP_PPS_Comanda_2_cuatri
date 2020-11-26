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

  updateEstadoCocina(pedido: any, estado: number) { 
    return  this.db.collection('pedidos').doc(pedido).update({
      estadoCocina: estado,
    }) 
  }
  updateEstadoBar(pedido: any, estado: number) { 
    return  this.db.collection('pedidos').doc(pedido).update({
      estadoBar: estado,
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

  agregarEncuesta(pedido: string, encuesta: any) { 
    return  this.db.collection('pedidos').doc(pedido).update({
      encuesta: encuesta,
      estadoEncuesta: 1
    }) 
  }
}