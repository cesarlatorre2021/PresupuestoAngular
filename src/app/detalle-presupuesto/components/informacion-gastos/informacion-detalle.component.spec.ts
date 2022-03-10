import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionDetalleComponent } from './informacion-detalle.component';

describe('InformacionDetalleComponent', () => {
  let component: InformacionDetalleComponent;
  let fixture: ComponentFixture<InformacionDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
