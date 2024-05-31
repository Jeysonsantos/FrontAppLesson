import { Dados, Label, TextoLabels, data, filtro} from '../../componentes/models/dados';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DadosServicesService {
  apiurl_texto = "http://localhost:8000/texto/processar/"
  apiurl_labels = "http://localhost:8000/labels/"
  apiurl_addTexto = "http://localhost:8000/texto/adicionar/"
  apiurl_attTexto = "http://localhost:8000/texto/atualizar/"
  apiurl_getTextos = "http://localhost:8000/texto/"
  apiurl_getTextosIdLabels = "http://localhost:8000/textoIdLabels/listar/"

  constructor(private http:HttpClient) { }

  processarDados(dados:Dados){
    return this.http.post<any>(this.apiurl_texto, dados)
  }

  adicionarLabel(label:string){
    console.log(label)
    return this.http.post<any>(this.apiurl_labels + "criar/", {label:label})
  }

  getLabels(){
    return this.http.get<Label[]>(this.apiurl_labels + "listar/")
  }

  adicionarTexto(data:data){
    return this.http.post<any>(this.apiurl_addTexto, data)
  }

  atualizarTexto(data:data){
    console.log(data)
    return this.http.put<any>(this.apiurl_attTexto, data)
  }

  getTextos(){
    return this.http.get<TextoLabels[]>(this.apiurl_getTextos + "listar/")
  }
  
  getTextosIdLabels(){
    return this.http.get<filtro[]>(this.apiurl_getTextosIdLabels)
  }
}
