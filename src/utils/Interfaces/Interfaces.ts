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