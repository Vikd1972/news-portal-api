import { OpenAPIV3 } from 'openapi-types';
import _ from 'lodash';

import { ExtendedEndpointData } from '../endpoint';
import { MiddlewareType } from '../../middlewares/type';

type SwaggerResponses = { [code: string]: OpenAPIV3.ResponseObject }

const isErrorStatusCode = (code: number): boolean => {
  const codeStr = code.toString();

  return ['4', '5'].includes(codeStr[0]);
};

const createSwaggerObject = (endpoints: ExtendedEndpointData[]): OpenAPIV3.Document => {
  const paths: OpenAPIV3.PathsObject<unknown, unknown> = {
    '/ping': {
      get: {
        tags: ['System'],
        responses: {
          200: {
            description: 'pong',
          },
        },
      },
    },
  };

  endpoints.forEach((endpoint) => {
    const path = endpoint.fullPath
      .replace(/\/$/, '')
      .replace(/:[^/]+/g, (match) => `{${match.replace(':', '')}}`);

    if (!paths[path]) {
      paths[path] = {};
    }

    const responsesArr = [
      ...endpoint.description.responses,
      ...endpoint.middlewares.map((middleware: MiddlewareType) => {
        if (middleware.swaggerErrors) {
          return middleware.swaggerErrors;
        }
        return null;
      }).filter((i) => i).flat(),
    ].map((response) => {
      if (!isErrorStatusCode(response.statusCode)) {
        return response;
      }

      const newResponse = _.cloneDeep(response);
      newResponse.schema.example.statusCode = response.statusCode;
      return newResponse;
    });

    const responses: SwaggerResponses = responsesArr.reduce((acc, item) => {
      acc[item.statusCode] = {
        description: item.description,
        content: {
          data: {
            schema: item.schema,
          },
        },
      };
      return acc;
    }, {} as SwaggerResponses);

    paths[path][endpoint.method] = {
      ...endpoint.swagger,
      ...endpoint.description.swagger,
      tags: [endpoint.swagger.endpointGroup],
      requestBody: endpoint.method !== 'get' ? endpoint.description.swagger.requestBody : undefined,
      responses,
    };
  });

  return {
    openapi: '3.0.0',
    info: {
      title: 'Add your API name here',
      description: 'Add your API description here',
      version: '1.0.0',
    },
    paths,
  };
};

export default createSwaggerObject;
