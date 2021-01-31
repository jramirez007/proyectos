import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignoEliminarComponent } from './signo-eliminar.component';

describe('SignoEliminarComponent', () => {
  let component: SignoEliminarComponent;
  let fixture: ComponentFixture<SignoEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignoEliminarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignoEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
