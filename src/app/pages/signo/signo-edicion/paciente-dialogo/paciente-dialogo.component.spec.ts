import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteDialogoComponent } from './paciente-dialogo.component';

describe('PacienteDialogoComponent', () => {
  let component: PacienteDialogoComponent;
  let fixture: ComponentFixture<PacienteDialogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacienteDialogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
