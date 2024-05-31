export interface Dados { 
    entrada: string;
    tipo: string;
}
export interface RespostaAPI<T>{
    tipo_elementos : string;
    descricao : string;
    elementos_list : T[];
}

export interface Elemento {
    descricao_elemento: string;
    percentual: string;
}

export interface data {
    id : number;
    texto : string;
    tipo : string;
    labels : string[];
  }
  
export interface TextoLabels {
    id : number;
    labels : Label[];
    textos : {
        id : number;
        texto : string;
        tipo : string;
    };
  }
export interface Label {
    id: number;
    label: string;
  }

export interface filtro{
    texto:string
    id_textoLabel:number
    tipo:string
    label: Label[]
}