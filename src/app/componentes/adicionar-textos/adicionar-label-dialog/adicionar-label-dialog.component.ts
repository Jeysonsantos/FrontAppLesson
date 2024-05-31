import { DadosServicesService } from '../../../servicos/dadosServices/dados-services.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-adicionar-label-dialog',
  templateUrl: './adicionar-label-dialog.component.html',
  styleUrls: ['./adicionar-label-dialog.component.css']
})
export class AdicionarLabelDialogComponent {
  form: FormGroup;
  title = 'Adicionar Label';
  constructor(private dialog: MatDialog,private formBuilder: FormBuilder, private DadosServicesService: DadosServicesService, private snackbar: MatSnackBar) {
    this.form = this.formBuilder.group({
      label: ['', Validators.required]
    });
  }
  submitForm(): void {
    if (this.form.invalid) {
      return;
    }
    const label = this.form.get('label')?.value;

    this.DadosServicesService.adicionarLabel(label).subscribe(
      (response) => {
        this.snackbar.open('Label adicionada com sucesso', 'Fechar', {
          duration: 3000,
        });
        this.dialog.closeAll();
      },
      (error) => {
        this.snackbar.open(error.error.message, 'Fechar', {
          duration: 6000,
        });
      }
    );
    this.dialog.closeAll();
  }

}
