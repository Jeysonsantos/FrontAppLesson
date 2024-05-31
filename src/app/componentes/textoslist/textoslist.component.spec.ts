import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextoslistComponent } from './textoslist.component';

describe('TextoslistComponent', () => {
  let component: TextoslistComponent;
  let fixture: ComponentFixture<TextoslistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextoslistComponent]
    });
    fixture = TestBed.createComponent(TextoslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
