import { Routes } from '@angular/router';
import { AgregarProductos } from "./paginas/agregar-productos/agregar-productos";
import { EditarProductos } from "./paginas/editar-productos/editar-productos";
import { PaginaProductos } from "./paginas/pagina-productos/pagina-productos";

export const routes: Routes = [
{
    title: 'Recycleware',
    path: '',
    component: PaginaProductos
},
{
    title: 'Añadir producto',
    path: 'añadir',
    component: AgregarProductos
},
{
    title: 'Editar producto',
    path: 'editar/:id',
    component: EditarProductos
}

];
