import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionIngresosComponent } from './informacion-ingresos.component';

describe('InformacionIngresosComponent', () => {
  let component: InformacionIngresosComponent;
  let fixture: ComponentFixture<InformacionIngresosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionIngresosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionIngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
});
