import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { Label, TextoLabels, data, filtro } from '../models/dados';
import { DadosServicesService } from '../../servicos/dadosServices/dados-services.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdicionarLabelDialogComponent } from './adicionar-label-dialog/adicionar-label-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, map, startWith, throwError } from 'rxjs';


@Component({
  selector: 'app-adicionar-textos',
  templateUrl: './adicionar-textos.component.html',
  styleUrls: ['./adicionar-textos.component.css']
})
export class AdicionarTextosComponent {
  dados: FormGroup;
  novaLabel: string = '';
  labels: string[] = []; 
  tipos = ['incident', 'lesson', 'observation', 'other']
  selectedLabels: string[] = [];
  loading: boolean = false;
  myControl_tipo = new FormControl('');
  myControl_label = new FormControl('');

  filteredOptions_label: Observable<string[]>;


  constructor(private dadosservice:DadosServicesService,private fb: FormBuilder,private router: Router, private dialogref: MatDialogRef<AdicionarTextosComponent>,private dialog : MatDialog,private _snackBar: MatSnackBar,@Inject(MAT_DIALOG_DATA) public data: any) {


    this.dados = this.fb.group({
      texto: ['', Validators.required],
      tipo: ['other', Validators.required],
      labels: this.fb.array([{}, {}, {}, {}, {}])
    });

    if (data) {
      console.log(data)
      const { elemento } = data;
      if (elemento) { 
        this.dados.patchValue({
          texto: elemento.texto || '',
          tipo: elemento.tipo || '',
          labels: Array.isArray(elemento.label) ? elemento.label : [] // Preencher o campo labels com o valor do elemento, se existir
        });
        for (let i = 0; i < elemento.label.length; i++) {
          this.selectedLabels.push(elemento.label[i].label);
        }
      }
    }

    this.filteredOptions_label = this.myControl_label.valueChanges.pipe(
      startWith(''),
      map(value_label => this._filter_label(value_label || '')),
    );

  }

  ngOnInit(): void {
    this.loadLabels();
}

loadLabels(): void {
  // Chame o método getLabels() para obter as labels do backend
  this.dadosservice.getLabels().subscribe(
    (response) => {
      // Mapeie apenas os labels a partir da resposta do backend
      const labelStrings = response.map((item: Label) => item.label);
      // Atribua os labels obtidos à variável labels
      console.log(response)
      this.labels = labelStrings;
      this.filteredOptions_label = this.myControl_label.valueChanges.pipe(
        startWith(''),
        map(value_label => this._filter_label(value_label || '')),
      );
    },
    (error) => {
      console.error('Erro na solicitação:', error);
    }
  );
}

atualizarDados(): void {

  const newData ={
    id : this.data.elemento.id_textoLabel,
    labels : this.selectedLabels,
    texto : this.dados.value.texto,
    tipo : this.dados.value.tipo
  }
  this.loading = true;

  this.dadosservice.atualizarTexto(newData).subscribe(
    (response) => {
      this.loading = false;
      this.dialogref.close({event: 'Atualizado'}); // Feche a janela de diálogo
    },
    (error) => {
      this._snackBar.open(error.error.message, 'Fechar', {
        duration: 7000,
      });
    }
  );
}
  processarDados() {
    if (this.dados.valid) {
      
      const data : data = {
        id : 0,
        texto : this.dados.value.texto,
        tipo : this.dados.value.tipo,
        labels : this.selectedLabels
      }

      this.dadosservice.adicionarTexto(data).subscribe(
        (response) => {
          this._snackBar.open('Texto adicionado.', 'Fechar', {
            duration: 2000,
          });
          setTimeout(() => {
            // Depois de salvo, redirecione para a página de listagem
            this.router.navigate(['/home']);
          }, 3000);
        },
        (error) => {
          this._snackBar.open(error.error.message, 'Fechar', {
            duration: 7000,
          });
        }
      );
    }
  }
  cancelar(): void {
    this.dialogref.close({event: 'Cancelar'});
  }

  openDialogCriarLabel(): void {
    const dialogRef = this.dialog.open(AdicionarLabelDialogComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this._snackBar.open('Label adicionada.', 'Fechar', {
          duration: 2000,
        });
    }
    this.loadLabels();
    });
  }

  openDialogCriarTipo(): void {
    this._snackBar.open('Em desenvolvimento.', 'Fechar', {
      duration: 2000,
    });
  }

  private _filter_label(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.labels.filter(labels => labels.toLowerCase().includes(filterValue));
  }

  atualizarTipo(event: any): void {
    this.dados.patchValue({
      tipo: event.value // Atualize o valor do campo 'tipo' com o valor selecionado
    });
  }

    // Método chamado quando uma label é selecionada
    atualizarLabels(): void {
      if(this.myControl_label.value == null || this.myControl_label.value == ''){
        return;
      }
      if(this.selectedLabels.length >= 5){
        this._snackBar.open('Número máximo de labels atingido.', 'Fechar', {
          duration: 3000,
        });
        return;
      }
      const option_label = this.myControl_label.value;
      this.selectedLabels.push(option_label); 

      // Limpa o campo de seleção de label
      this.myControl_label.setValue('');
    }

    removerLabel(selectedLabel: string): void {
      this.selectedLabels = this.selectedLabels.filter(label => label !== selectedLabel);
    }

}
