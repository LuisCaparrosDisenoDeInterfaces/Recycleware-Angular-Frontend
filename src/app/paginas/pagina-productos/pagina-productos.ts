import { HttpClient, HttpHandler, JsonpClientBackend, provideHttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ApiService, Producto } from '../../services/api';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-productos',
  imports: [],
  styleUrl: './pagina-productos.scss',
  template: `
  <div class="container">
    <h1 class="h1 fw-bold mt-3">Gestión de productos</h1>
    <div class="w-100 d-flex flex-row-reverse"><button class="btn btn-secondary my-2 px-3 fs-5 shadow-sm" (click)="goToAgregar()">Añadir producto</button></div>
    <table class="table table-striped shadow-sm text-center align-middle">
        <thead class="table-primary table-striped-columns">
            <tr >
                <th scope="col">#</th>
                <th scope="col" class="text-start">Nombre</th>
                <th scope="col">Categoría</th>
                <th scope="col">Estado</th>
                <th scope="col">Disponibilidad</th>
                <th scope="col">Acciones</th>
            </tr>
       </thead>
      <tbody>       
        @for (p of productos; track p){
          <tr>
                <th scope="row" class="table-secondary">{{p.id}}</th>
                <td class="text-start">{{p.nombre}}</td>
                <td>{{p.categoria.nombre}}</td>
                <td>{{p.estado.nombre}}</td>
                <td>{{p.disponibilidad.nombre}}</td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic outlined example">
                        <button type="button" class="btn btn-warning" (click)="goToEdit(p.id)">Editar</button>
                        <button type="button" class="btn btn-danger" (click)="borrarProducto(p.nombre, p.id)">Borrar</button>
                    </div>
                </td>
            </tr>
        }
            
            
            
        </tbody>
    </table>
</div>
  `

})
export class PaginaProductos {
  private router = inject(Router);

  public productos: Producto[] | undefined;

  public elementosLista: any[] | undefined;

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) { }
  ngOnInit() {
    this.apiService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }



  goToEdit(id: number) {
    this.router.navigate(['editar/' + id])
  }

  borrarProducto(nombre: string, id: number) {
    if (confirm("¿Quieres borrar el siguiente producto?\n"+ nombre) == true) {
      this.apiService.deleteProducto(id);
      console.log("Se ha intentado")
    }
  }

  goToAgregar() {
    this.router.navigate(['añadir/']);
  }
}
