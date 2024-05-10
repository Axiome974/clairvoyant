import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { AjvSchema } from "../types/AjvSchema";

const ajv = new Ajv();
addFormats(ajv);



const ajvValidator = {

    validate:<boolean>function( ajvSchema:AjvSchema, data:object ){

        const validate = ajv.compile(ajvSchema);
        const valid = validate(data);

        if (!valid) {
            throw new Error(validate.errors[0].message);
            return false;
        }

        return true;
    }

}

export default ajvValidator;