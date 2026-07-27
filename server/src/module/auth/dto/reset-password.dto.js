import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class ResetPasswordDto extends BaseDto {
    static schema = Joi.object({
        password : Joi.string().min(8).required().pattern(/(?=.*[A-Z])(?=.*\d)/).messages({
                "string.min": "Password must contain atleast 8 characters",
                "any.required": "Password is required"
        })
    });
};

export default ResetPasswordDto;