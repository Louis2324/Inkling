import Joi from "joi";
export const idParamSchema = Joi.object({
    id: Joi.string().length(24).hex().required()
});
