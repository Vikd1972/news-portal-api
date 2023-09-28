import { OpenAPIV3 } from 'openapi-types';

import { ShapeObjectType, ShapeItemType } from '../../middlewares/createValidationMiddleware';
import { SwaggerResponseType } from '../swagger';

export type SwaggerBodyItem = (
  (OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject) &
  {
    isRequired: boolean;
    name?: string;
  }
)

export type BodyItemDescriptionType = {
  validation: ShapeItemType,
  swagger?: SwaggerBodyItem,
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

type SwaggerPagameterItem__withoutName = PartialBy<OpenAPIV3.ParameterObject, 'name'>
export type SwaggerPagameterItem = PartialBy<SwaggerPagameterItem__withoutName, 'in'>

export type SwaggerOutputObject = PartialBy<OpenAPIV3.OperationObject, 'responses'>

export type ParamsItemDescriptionType = {
  validation: ShapeItemType,
  swagger?: SwaggerPagameterItem,
}

class EndpointDataBuilder {
  private validation = {
    body: {} as ShapeObjectType,
    params: {} as ShapeObjectType,
    query: {} as ShapeObjectType,
  };

  private swagger = {
    body: [] as SwaggerBodyItem[],
    params: [] as SwaggerPagameterItem[],
    query: [] as SwaggerPagameterItem[],
  };

  private swaggerResponses = [] as SwaggerResponseType[];

  bodyField(options: BodyItemDescriptionType) {
    return (obj, propertyName) => {
      this.validation.body[propertyName] = options.validation;
      if (options.swagger) {
        this.swagger.body.push({
          ...options.swagger,
          name: propertyName,
        });
      }
    };
  }

  queryField(options: ParamsItemDescriptionType) {
    return (obj, propertyName) => {
      this.validation.query[propertyName] = options.validation;
      if (options.swagger) {
        this.swagger.query.push({
          ...options.swagger,
          name: propertyName,
          in: 'query',
        });
      }
    };
  }

  paramsField(options: ParamsItemDescriptionType) {
    return (obj, propertyName) => {
      this.validation.params[propertyName] = options.validation;
      if (options.swagger) {
        this.swagger.params.push({
          ...options.swagger,
          name: propertyName,
          in: 'path',
        });
      }
    };
  }

  setSwaggerResponses(data: SwaggerResponseType[]) {
    this.swaggerResponses.push(...data);
  }

  getValidation() {
    return this.validation;
  }

  getSwagger() {
    return {
      parameters: [
        ...this.swagger.params,
        ...this.swagger.query,
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: this.swagger.body.filter((i) => i.isRequired).map((i) => i.name),
              properties: {
                ...this.swagger.body.reduce((acc, item) => {
                  const bodyItem = { ...item };
                  delete bodyItem.name;
                  delete bodyItem.isRequired;

                  acc[item.name] = bodyItem;

                  return acc;
                }, {} as { [name: string]: (OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject) }),
              },
            },
          },
        },
        required: Boolean(this.swagger.body.length),
      },
    } as SwaggerOutputObject;
  }

  getDescription() {
    return {
      validation: this.getValidation(),
      swagger: this.getSwagger(),
      responses: this.swaggerResponses,
    };
  }
}

export default EndpointDataBuilder;
