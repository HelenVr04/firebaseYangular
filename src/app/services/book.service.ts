import { Injectable, inject } from '@angular/core';
import { Book } from '../models/book.model';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private db : Firestore = inject(Firestore);

  constructor() { }

  //Método para obtener los documentos de la colección
  getBooks(){
    const booksCollection = collection(this.db, 'books');
    return collectionData((booksCollection), {idField: 'id'}).pipe(first());
  }

  //Método para agregar un nuevo documento
  agregarBook(book:Book){
    const booksCollection = collection(this.db, 'books');
    const bookData = {
      titulo: book.titulo,
      autor: book.autor,
      precio: book.precio,
      recomendable: book.recomendable
    };
    addDoc(booksCollection, bookData);
  }

  //Método para modificar un documento
  modificarBook(book:Book){
    const documentRef = doc(this.db, 'books', book.id);
    updateDoc(documentRef, {
      itulo: book.titulo,
      autor: book.autor,
      precio: book.precio,
      recomendable: book.recomendable
    })
  }

  //Método para borrar un documento
  eliminarBook(book:Book){
    const documentRef = doc(this.db, 'books', book.id);
    deleteDoc(documentRef);
  }
}
