import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Dados, Elemento, RespostaAPI } from 'src/app/componentes/models/dados';
import { DadosServicesService } from 'src/app/servicos/dadosServices/dados-services.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent {
  valorCampo: FormGroup;

  respostaAPI : RespostaAPI<Elemento> = {
    tipo_elementos : '',
    descricao : '',
    elementos_list : []
  }
  

  
  constructor(private dadosservice:DadosServicesService,private fb: FormBuilder,private route: ActivatedRoute,private router: Router) {
    this.valorCampo = this.fb.group({
      campoInput: ['', Validators.required],
      selecionador: ['lesson', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params && params['tipo_elementos'] && params['descricao'] && params['elementos_list']) {
        this.valorCampo.patchValue({
          campoInput: params['entrada']
        });
        this.respostaAPI.tipo_elementos = params['tipo_elementos'];
        this.respostaAPI.descricao = params['descricao'];
        this.respostaAPI.elementos_list = JSON.parse(params['elementos_list']);
      }
    });
  }

  processarDados() {
    if (this.valorCampo.valid) {
      const dados:Dados = {
        entrada: this.valorCampo.value.campoInput,
        tipo: this.valorCampo.value.selecionador
      };
      this.dadosservice.processarDados(dados).subscribe(
        (response) => {

          this.respostaAPI.tipo_elementos = response.resultado.tipo_elementos;
          this.respostaAPI.descricao = response.resultado.descricao;
          this.respostaAPI.elementos_list = response.resultado.elementos_list;

        },
        (error) => {
          console.error('Erro na solicitação:', error);
        }
      );
    }
  }

  handleClick(item: any) {
    const dados:Dados = {
      entrada: item.descricao_elemento,
      tipo: 'observation'
    };
    this.dadosservice.processarDados(dados).subscribe(
      (response) => {
        this.irParaProximoComponente(response,item.descricao_elemento);
      },
      (error) => {
        console.error('Erro na solicitação:', error);
      }
    );
     
  }

  irParaProximoComponente(response: any, entrada: string) {

    const elementosListString = JSON.stringify(response.resultado.elementos_list);

    this.router.navigate(['/observation'], { 
      queryParams: 
      { 
        entrada: entrada,
        tipo_elementos : response.resultado.tipo_elementos,
        descricao : response.resultado.descricao,
        elementos_list : elementosListString
      }
       });
      }
}




