import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstilofundoComponent } from './estilofundo.component';

describe('EstilofundoComponent', () => {
  let component: EstilofundoComponent;
  let fixture: ComponentFixture<EstilofundoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstilofundoComponent]
    });
    fixture = TestBed.createComponent(EstilofundoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
