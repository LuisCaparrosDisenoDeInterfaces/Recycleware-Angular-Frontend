import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080/api';

  

  getProductos(): Observable<Producto[]> {
   
    return this.http.get<Producto[]>(this.baseUrl+"/productos");
  }

  getProductoById(id: number): Observable<Producto>{
    return this.http.get<Producto>(this.baseUrl+ "/productos/"+id)
  }

  getCategoriasProducto(): Observable<String[]>{
    return this.http.get<String[]>(this.baseUrl+ "/productos/categorias") 
  }

  getEstadosProducto(): Observable<String[]>{
    return this.http.get<String[]>(this.baseUrl+ "/productos/estados") 
  }

  saveProducto(producto : Partial<Producto>) : Observable<Producto>{
    if (producto.id == null) {
      return this.http.post<Producto>(this.baseUrl+ "/productos", producto)
    }else{
      return this.http.put<Producto>(this.baseUrl+ "/productos/"+producto.id, producto)
    }
  }
  
  deleteProducto(id: number){
    this.http.delete(this.baseUrl+"/productos/"+id);
  }
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: Categoria;
  estado: Estado;
  disponibilidad: Disponibilidad;
  imagenUrl?: string;
}

export interface Categoria{
  id: number;
  nombre: string;
}

export interface Estado{
  id: number;
  nombre: string;
}

export interface Disponibilidad{
  id: number;
  nombre: string;
}