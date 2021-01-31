import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaseEliminarComponent } from './clase-eliminar.component';

describe('ClaseEliminarComponent', () => {
  let component: ClaseEliminarComponent;
  let fixture: ComponentFixture<ClaseEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaseEliminarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaseEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
