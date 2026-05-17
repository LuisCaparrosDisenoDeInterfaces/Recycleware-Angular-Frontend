import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, Producto } from '../../services/api';

@Component({
  selector: 'app-editar-productos',
  imports: [],
  styleUrl: './editar-productos.scss',
  template: `
  <div class="container">

    <h1 class="h1 fw-bold p-3">Editar producto</h1>
    <div class="bg-secondary-subtle p-3 border rounded shadow-sm">
        <form>
            <div class="mb-3">
                <label for="inputProdNombre" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="inputNombreProd" [value]="producto?.nombre">
            </div>
            <div class="mb-3 container-fluid p-0">
                <div class="row">
                    <div class="col">
                        <label for="inputCategoriaProd" class="form-label">Categoria</label>
                        <select class="form-select" id="inputCategoriaProd" [value]="producto?.categoria?.nombre">
                          @for (c of listaCategorias; track c){
                            <option [value]="c" tex>{{c}}</option>
                          }
                            
                            
                        </select>
                    </div>
                    <div class="col">
                        <label for="inputEstadoProd" class="form-label">Estado</label>
                        <select class="form-select" id="inputEstadoProd" [value]="producto?.estado?.nombre">
                            @for (e of listaEstados; track e){
                            <option [value]="e" tex>{{e}}</option>
                          }
                        </select>
                    </div>
                    <div class="col">
                        <label for="inputDisponibilidadProd" class="form-label">Disponibilidad</label>
                        <select class="form-select" id="inputDisponibilidadProd" [value]="producto?.disponibilidad?.nombre">
                            <option value="Disponible">Disponible</option>
                            <option value="Reservado">Reservado</option>
                        </select>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="inputDescripcionProd" class="form-label">Descripción</label>
                    <textarea class="form-control" id="inputDescripcionProd" rows="3" [value]="producto?.descripcion"></textarea>
                </div>
                <div class="mb-3">
                    <label for="inputImagenProd" class="form-label">URL de la imagen</label>
                    <input type="text" class="form-control" id="inputImagenProd" [value]="producto?.imagenUrl">
                </div>

            </div>
        </form>
        <button (click)="guardarProducto()" class="btn btn-primary">Guardar</button>
    </div>

</div>`
})
export class EditarProductos {
  readonly prodId: unknown;
  private route = inject(ActivatedRoute);

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {
    this.prodId = this.route.snapshot.paramMap.get('id');
  }

  private router = inject(Router);

  public producto?: Producto

  protected listaCategorias?: String[]
  protected listaEstados?: String[]

  ngOnInit() {
    this.apiService.getProductoById(this.prodId as number).subscribe({
      next: (data) => {
        this.producto = data;
        console.log(this.producto);
      },
      error: (err) => {
        console.error(err);
      }
    });
    this.apiService.getCategoriasProducto().subscribe({
      next: (data) => {
        this.listaCategorias = data;
        console.log(this.listaCategorias);
      }
    });
    this.apiService.getEstadosProducto().subscribe({
      next: (data) => {
        this.listaEstados = data;
        console.log(this.listaEstados);
      }
    });
  }

  guardarProducto() {
    if (confirm("¿Quieres guardar los datos?") == true) {
      this.producto!.categoria = {id:this.listaCategorias!.indexOf(this.producto!.categoria.nombre), nombre:this.producto!.categoria.nombre}
      this.producto!.estado = {id:this.listaEstados!.indexOf(this.producto!.estado.nombre), nombre:this.producto!.estado.nombre}
      if (this.producto?.disponibilidad.nombre == "Disponible") {
        this.producto!.disponibilidad = {id:1, nombre: this.producto.disponibilidad.nombre}
      } else if (this.producto?.disponibilidad.nombre == "Reservado") {
        this.producto!.disponibilidad = {id:2, nombre: this.producto.disponibilidad.nombre}
      }
      console.log(this.producto)
      this.apiService.saveProducto(this.producto!)
    }
  }
}
