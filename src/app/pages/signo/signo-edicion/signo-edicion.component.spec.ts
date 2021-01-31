import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignoEdicionComponent } from './signo-edicion.component';

describe('SignoEdicionComponent', () => {
  let component: SignoEdicionComponent;
  let fixture: ComponentFixture<SignoEdicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignoEdicionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignoEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
