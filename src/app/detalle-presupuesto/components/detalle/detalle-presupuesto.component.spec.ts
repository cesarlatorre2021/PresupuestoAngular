import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DetallePresupuestoComponent } from './detalle-presupuesto.component';

describe('DetallePresupuestoComponent', () => {
  let component: DetallePresupuestoComponent;
  let fixture: ComponentFixture<DetallePresupuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallePresupuestoComponent ],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
