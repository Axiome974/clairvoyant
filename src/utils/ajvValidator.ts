import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import AjvSchemaModel from "../types/ISchemaModel";

const ajv = new Ajv();
addFormats(ajv);

export interface ajvValidator {
    validate(Model:AjvSchemaModel<any>, data:object):boolean;
}

const ajvValidator:ajvValidator = {

    validate: function(Model:AjvSchemaModel<any>, data:object){

        if( !Model.ajvSchema ){
            throw new Error('Schema validator not found');
            return null;
        }

        const validate = ajv.compile(Model.ajvSchema);
        const valid = validate(data);

        if (!valid) {
            throw new Error(validate.errors[0].message);
            return false;
        }

        return true;
    }


}

export default ajvValidator;