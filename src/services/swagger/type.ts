import { OpenAPIV3 } from 'openapi-types';

export type SwaggerResponseType = {
  statusCode: number;
  description: string;
  schema: OpenAPIV3.SchemaObject;
}
