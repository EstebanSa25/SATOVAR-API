import { RegisterMeasureShirtDto } from '../dtos';

export const T_Shirt_Entity = (
    registerMeasureShirtDto: RegisterMeasureShirtDto
) => {
    return {
        CI_PECHO: registerMeasureShirtDto.pecho,
        CI_CINTURA: registerMeasureShirtDto.cintura,
        CI_CADERA: registerMeasureShirtDto.cadera,
        CI_ESPALDA: registerMeasureShirtDto.espalda,
        CI_HOMBRO: registerMeasureShirtDto.hombro,
        CI_CUELLO: registerMeasureShirtDto.cuello,
        CI_L_MANGA: registerMeasureShirtDto.largoManga,
        CI_L_TOTAL: registerMeasureShirtDto.largoTotal,
        CI_BRAZO: registerMeasureShirtDto.brazo,
        CI_PUNO: registerMeasureShirtDto.puno,
        CV_DETALLES: registerMeasureShirtDto.detalles,
    };
};
