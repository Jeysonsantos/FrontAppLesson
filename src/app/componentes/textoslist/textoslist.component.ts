import { DadosServicesService } from 'src/app/servicos/dadosServices/dados-services.service';
import { AfterViewInit, Component, ViewChild, numberAttribute } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TextoLabels, filtro } from '../models/dados';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdicionarTextosComponent } from '../adicionar-textos/adicionar-textos.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs';

@Component({
  selector: 'app-textoslist',
  templateUrl: './textoslist.component.html',
  styleUrls: ['./textoslist.component.css'],
})
export class TextoslistComponent{
  filtro: filtro[] = [];
  Dados: TextoLabels[] = [];
  displayedColumns: string[] = ['edit', 'texto', 'tipo', 'labels'];
  dataSource = new MatTableDataSource(this.filtro);
  loading: boolean = false;

  
  constructor(private DadosServicesService: DadosServicesService, private _snackBar: MatSnackBar, public dialog: MatDialog) {
    this.carregarDados();
  }

  carregarDados(): void {
    this.loading = true;
    this.DadosServicesService.getTextosIdLabels().subscribe(
      (response2) => {
        console.log(response2);
        this.dataSource = new MatTableDataSource(response2);
        this.loading = false;
      },
      (error) => {
        console.error('Erro ao carregar dados:', error);
        this.loading = false;
      }
    );
  }
  

  recarregarDados() {
    this.filtro = []
    this.loading = true;
    this.DadosServicesService.getTextosIdLabels().subscribe(
      (response2) => {
        console.log(response2)
        for (let i = 0; i < response2.length; i++) {
          this.filtro.push(response2[i])
        }
        this.dataSource = new MatTableDataSource(this.filtro);
        this.loading = false;
      })
    return true

  }

  applyFilter(event: Event) {
    const target = event.target as HTMLInputElement;
    const filterValue = target.value.trim().toLowerCase();
    this.loading = true;

    // Filtrar os dados localmente
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      // Verificar se o texto de filtro está presente no campo 'texto'
      return data.texto.trim().toLowerCase().includes(filter);
    };

    // Aplicar o filtro
    this.dataSource.filter = filterValue;

    setTimeout(() => {
      this.loading = false;
    }, 500);
  }


  editarTexto(elemento: TextoLabels) {
    this.openDialogAdicionarEditarTexto(elemento)
  }

  openDialogAdicionarEditarTexto(elemento: TextoLabels): void {
    const dialogRef = this.dialog.open(AdicionarTextosComponent, {
      width: 'auto',
      height: 'auto',
      data: { elemento },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Atualizado') {
        this.loading = true; // Ativa o indicador de carregamento
        if (this.recarregarDados()) {
          setTimeout(() => {
            this.loading = false; // Desativa o indicador de carregamento
            this._snackBar.open('Texto atualizado.', 'Fechar', {
              duration: 2000,
            });
          }, 1000);
        } else {
          this._snackBar.open('Erro ao atualizar texto.', 'Fechar', {
            duration: 7000,
          });
        }
      } else {
        if (result.event == 'Cancelar') {
          this._snackBar.open('Operação cancelada.', 'Fechar', {
            duration: 2000,
          });
        }
      }
    });
  }
}
