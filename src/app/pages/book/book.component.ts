import { Component } from '@angular/core';
import { Book } from '../../models/book.model';
import {FormsModule} from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book',
  imports: [FormsModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  //propiedades 

  books: any;
  book =  new Book();

  constructor(private bookService: BookService){
    this.getBooks();
    this,this.book.recomendable=false;
  }

    //método para obetner el listado de libros 

    async getBooks(): Promise<void>{
      this.books = await firstValueFrom(this.bookService.getBooks());
    }


    //método para insertar un nuevo libro desde el forms 
    insertarBook(){
      if(!this.validarBook()) return;
      this.bookService.agregarBook(this.book);
      this.getBooks();
      this.book = new Book();
  }
  //método para seleccionar un libro de la tabla 
  selectBook(bookSelect: Book){
    this.book = bookSelect;
  }

  //metodo para modificar un libro 
  updateBook(){
    if(!this.validarBook()) return;
    this.bookService.modificarBook(this.book); 
    this.getBooks();
    this.book = new Book();
  }
  //eliminar un libro
  deleteBook() {
    const confirmacion = confirm('¿Estás seguro de que quieres eliminar este libro?');
    if (confirmacion) {
      this.bookService.eliminarBook(this.book);
      this.getBooks();
      this.book = new Book();
    }
  }
  
  validarBook(): boolean {
    if (!this.book.titulo || this.book.titulo.trim().length < 10) {
        alert("El título debe tener al menos 10 caracteres.");
        return false;
    }
    if (!this.book.autor || this.book.autor.trim().length === 0) {
        alert("El autor es obligatorio.");
        return false;
    }
    if (!this.book.precio || this.book.precio < 0) {
        alert("El precio debe ser un número positivo");
        return false;
    }
    return true;
  }
}