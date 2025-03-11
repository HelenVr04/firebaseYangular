import { Injectable, inject } from '@angular/core';
import { Libro } from '../models/libro.model';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private db : Firestore = inject(Firestore);

  constructor() { }

  //Método para obtener los documentos de la colección
  getLibros(){
    const librosCollection = collection(this.db, 'libros');
    return collectionData((librosCollection), {idField: 'id'}).pipe(first());
  }

  //Método para agregar un nuevo documento
  agregarLibro(libro:Libro){
    const librosCollection = collection(this.db, 'libros');
    const libroData = {
      titulo: libro.titulo,
      autor: libro.autor,
      editorial: libro.editorial,
      anioPublicacion: libro.anioPublicacion
    };
    addDoc(librosCollection, libroData);
  }

  //Método para modificar un documento
  modificarLibro(libro:Libro){
    const documentRef = doc(this.db, 'libros', libro.id);
    updateDoc(documentRef, {
      titulo: libro.titulo,
      autor: libro.autor,
      editorial: libro.editorial,
      anioPublicacion: libro.anioPublicacion
    })
  }

  //Método para borrar un documento
  eliminarLibro(libro:Libro){
    const documentRef = doc(this.db, 'libros', libro.id);
    deleteDoc(documentRef);
  }
}
