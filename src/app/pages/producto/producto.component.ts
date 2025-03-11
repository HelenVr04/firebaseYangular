import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-producto',
  imports: [FormsModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
  //propiedades
  
  productos: any;
  producto= new Producto();

  constructor(private productoService: ProductoService) {
   this.getProductos();
  }

  //metodo para obtener el listado de productos 
  async getProductos(): Promise<void>{
    this.productos = await firstValueFrom(this.productoService.getProductos());
  }
  
  //metodo para insertar un nuevo producto desde el forms
  insertProducto(){
    if(!this.validarProducto()) return;
    this.productoService.agregarProducto(this.producto);
    this.getProductos();
    this.producto = new Producto();
  }

  //metodo para seleccioner un producto
  selectProducto(productoSeleccionado: Producto){
    this.producto=productoSeleccionado;
  }
  //metodo para modificar un producto
  updateProducto(){
    if(!this.validarProducto()) return;
    this.productoService.modificarProducto(this.producto);
    this.getProductos();
    this.producto = new Producto();
  }

  //eliminar producto
  deleteProducto() {
    const confirmacion = confirm('¿Estás seguro de que quieres eliminar este producto?');
    if (confirmacion) {
      this.productoService.eliminarProducto(this.producto);
      this.getProductos();
      this.producto = new Producto();
    }
  }
  
  /*deleteProducto(id: number){
    for(let i=0; i<this.productos.length; i++){
      if(id == this.productos[i].id){
        this.productos.splice(i,1);
        return;
      }
    }
    alert('No existeeee');
  }*/

    //validar datos del form jsajs
    validarProducto(): boolean {
    if (!this.producto.descripcion || this.producto.descripcion.trim().length < 3) {
        alert("La descripcion es obligatoria y mayor a 3 caracteres.");
        return false;
    }
    if (!this.producto.precio || this.producto.precio < 0) {
        alert("El precio debe ser un número positivo.");
        return false;
    }
    return true;
  }

 
}
