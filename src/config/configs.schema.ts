import * as Joi from "joi";

export default {
    NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

    MONGODB_HOST: Joi.string().required(),

    RABBITMQ_HOST: Joi.string().required(),
    RABBITMQ_PORT: Joi.number().required(),
}