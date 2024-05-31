import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarLabelDialogComponent } from './adicionar-label-dialog.component';

describe('AdicionarLabelDialogComponent', () => {
  let component: AdicionarLabelDialogComponent;
  let fixture: ComponentFixture<AdicionarLabelDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdicionarLabelDialogComponent]
    });
    fixture = TestBed.createComponent(AdicionarLabelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
