import { Clase } from './clase';
import { Color } from './color';
import { Marca } from './marca';
import { Modelo } from './modelo';
import { Propietario } from './propietario';

export class Placa {
    idPlaca: number;
    numPlaca: string;
    clase: Clase;
    marca: Marca;
    modelo: Modelo;
    color: Color;
    anio: string;
    propietario: Propietario;
    fechaEmision: string;
    fechaVencimiento: string;    
}