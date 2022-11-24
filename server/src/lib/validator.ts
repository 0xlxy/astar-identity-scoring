import Ajv from "ajv";
import Express from "express";

export const addressValidator = (req: Express.Request) => {
  const schema = {
    type: "object",
    properties: {
      collection: { type: "string", pattern: "^0x[a-fA-F0-9]{40}$" },
    },
  };
  const ajv = new Ajv();
  return { isValid: ajv.validate(schema, req.params), err: ajv.errors };
};
