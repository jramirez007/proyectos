import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaseEdicionComponent } from './clase-edicion.component';

describe('ClaseEdicionComponent', () => {
  let component: ClaseEdicionComponent;
  let fixture: ComponentFixture<ClaseEdicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaseEdicionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaseEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
