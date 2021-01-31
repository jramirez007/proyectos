import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoEliminarComponent } from './medico-eliminar.component';

describe('MedicoEliminarComponent', () => {
  let component: MedicoEliminarComponent;
  let fixture: ComponentFixture<MedicoEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicoEliminarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicoEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
