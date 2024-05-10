import {Model} from "sequelize";

export interface AjvSchema {
    type: string;
    properties: Record<string, { type: string; format?: string }>;
    required?: string[];
    additionalProperties?: boolean;
}


export default class AjvSchemaModel<T> extends Model<T> {
    public ajvSchema!: AjvSchema;
}