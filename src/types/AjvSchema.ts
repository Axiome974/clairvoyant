import {Model} from "sequelize";

export type AjvSchema = {
    type: string;
    properties: Record<string, { type: string; format?: string }>;
    required?: string[];
    additionalProperties?: boolean;
}
