export interface Auto {
    id: number;
    id_customer: string;
    identification_customer: string;
    car_model: string;
    factors: string;
    test_drive_qualification: number;
    satisfaction_rating: number;
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

export interface IinitialFormEdit {
    id_customer?: string,
    identification_customer: string,
    car_model: string,
    factors: string,
    test_drive_qualification: number,
    satisfaction_rating: number,
}