import { Component } from '@angular/core';
import { Libro } from '../../models/libro.model';
import {FormsModule} from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { LibroService } from '../../services/libro.service';

@Component({
  selector: 'app-libro',
  imports: [FormsModule],
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})
export class LibroComponent {
  //propiedades 

  libros: any;
  libro =  new Libro();

  constructor(private libroService: LibroService){
    this.getLibros();
  }

    //método para obetner el listado de libros 

    async getLibros(): Promise<void>{
      this.libros = await firstValueFrom(this.libroService.getLibros());
    }


    //método para insertar un nuevo libro desde el forms 
    insertarLibro(){
      if(!this.validarLibro()) return;
      this.libroService.agregarLibro(this.libro);
      this.getLibros();
      this.libro = new Libro();
  }
  //método para seleccionar un libro de la tabla 
  selectLibro(libroSeleccionado: Libro){
    this.libro = libroSeleccionado;
  }

  //metodo para modificar un libro 
  updateLibro(){
    if(!this.validarLibro()) return;
    this.libroService.modificarLibro(this.libro); 
    this.getLibros();
    this.libro = new Libro();
  }
  //eliminar un libro
  deleteLibro() {
    const confirmacion = confirm('¿Estás seguro de que quieres eliminar este libro?');
    if (confirmacion) {
      this.libroService.eliminarLibro(this.libro);
      this.getLibros();
      this.libro = new Libro();
    }
  }
  
  validarLibro(): boolean {
    if (!this.libro.titulo || this.libro.titulo.trim().length < 10) {
        alert("El título debe tener al menos 10 caracteres.");
        return false;
    }
    if (!this.libro.autor || this.libro.autor.trim().length === 0) {
        alert("El autor es obligatorio.");
        return false;
    }
    if (!this.libro.editorial || this.libro.editorial.trim().length === 0) {
        alert("La editorial es obligatoria.");
        return false;
    }
    if (!this.libro.anioPublicacion || this.libro.anioPublicacion < 1000 || this.libro.anioPublicacion > 2099) {
        alert("El año de publicación debe estar entre 1000 y 2099.");
        return false;
    }
    return true;
  }
}