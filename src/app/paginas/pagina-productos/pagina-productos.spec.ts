import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaProductos } from './pagina-productos';

describe('PaginaProductos', () => {
  let component: PaginaProductos;
  let fixture: ComponentFixture<PaginaProductos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaProductos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaProductos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
