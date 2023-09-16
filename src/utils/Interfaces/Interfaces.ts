export interface Auto {
    id: number;
    identificacion: string;
    modelo: string;
    factoresCompra: string;
    calificacionPrueba: number;
    calificacionSatisfaccion: number;
}

export interface FormData {
    email: string;
    password: string;
}

export interface Factors {
    value: string;
    label: string;
}

export interface IinitialFormCreate {
    identificacion: string,
    modelo: string,
    factoresCompra: string,
    calificacionPrueba: number,
    calificacionSatisfaccion: number,
}