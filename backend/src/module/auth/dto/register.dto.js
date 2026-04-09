import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class RegisterDto extends BaseDto {
    static schema = Joi.object({
        name: Joi.string().min(2).max(50).trim().required(),
        email : Joi.string().lowercase().email().required(),
        password : Joi.string().min(8).required().messages({
            "string.min": "Password must contain atleast 8 characters",
            "any.required": "Password is required"
        }),
        role: Joi.string().valid("customer", "admin").default("customer")
    })
}

export default RegisterDto;