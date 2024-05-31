import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarTextosComponent } from './adicionar-textos.component';

describe('AdicionarTextosComponent', () => {
  let component: AdicionarTextosComponent;
  let fixture: ComponentFixture<AdicionarTextosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdicionarTextosComponent]
    });
    fixture = TestBed.createComponent(AdicionarTextosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
