import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    JWT_SEED: get('JWT_SEED').required().asString(),
    WEBSERVICE_URL: get('WEBSERVICE_URL').required().asUrlString(),
    MAILER_SERVICE: get('MAILER_SERVICE').required().asString(),
    MAILER_EMAIL: get('MAILER_EMAIL').required().asEmailString(),
    MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').required().asString(),
    SEND_EMAIL: get('SEND_EMAIL').required().asBool(),
    DATABASE_URL: get('DATABASE_URL').required().asUrlString(),
    SECRET_API_KEY: get('SECRET_API_KEY').required().asString(),
    REACT_URL: get('REACT_URL').required().asUrlString(),
};
