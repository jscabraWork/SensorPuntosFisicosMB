import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntosfisicosComponent } from './puntosfisicos.component';

describe('PuntosfisicosComponent', () => {
  let component: PuntosfisicosComponent;
  let fixture: ComponentFixture<PuntosfisicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuntosfisicosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PuntosfisicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
