import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaNavComponent } from './prueba-nav.component';

describe('PruebaNavComponent', () => {
  let component: PruebaNavComponent;
  let fixture: ComponentFixture<PruebaNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PruebaNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
