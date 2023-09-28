import { Handler, RequestHandler } from 'express';
import { ShapeObjectType } from '../../middlewares/createValidationMiddleware';
import { SwaggerResponseType } from '../swagger';
import { SwaggerOutputObject } from './EndpointDataBuilder';

export type MethodType = 'get' | 'post' | 'put' | 'patch' | 'delete'

export type EndpointData = {
  controller: RequestHandler<unknown, unknown, unknown, unknown>;
  middlewares: Handler[];
  /** One of "get" | "post" | "put" | "patch" | "delete" */
  method: MethodType;
  /** Set to false if you want to disable an endpoint */
  isActive: boolean;
  /**
   * Path of an endpoint itself.
   *
   * Example:
   *
   * Your endpoint have `"/something/else"` as a *`basePath`*
   * and `"/awesome-path"` as a *`path`* value.
   *
   * The *`path`* value will be added in the end of the full endpoint path.
   *
   * In the end you'll have a next full path: `"/something/else/awesome-path"`
   */
  path: string;
  /**
   * If you'll set it to `null`, then the endpoint filder path will be used as a default value.
   *
   * Example:
   *
   * If you have a `null` value in the *`basePath`* field
   * and your endpoint folder located in the `something/nestedFolder/yourEndpointFolder`,
   * you will have `"/something/nested-folder"` as a *`basePath`*.
  */
  basePath: string | null;
  /**
   * If you set it to `false` then your endpoint folder name will be ignored in the full path.
   * Like `${basePath}${path}`.
   *
   * * If you set it to `true` then your endpoint folder name will be added to the full path.
   * Like `${basePath}${folderName}${path}`.
   */
  useFolderNameInPath: boolean;

  swagger?: {
    endpointGroup: string;
    summary: string;
    description: string;
  };

  description: {
    validation: {
      body: ShapeObjectType;
      params: ShapeObjectType;
      query: ShapeObjectType;
    };
    swagger: SwaggerOutputObject;
    responses: SwaggerResponseType[];
  };
}

export type EndpointFolder = { index: { default: EndpointData } }

export type EndpointDirType = EndpointFolder | {
  [key: string]: EndpointFolder
}

export type RawEndpointData = EndpointData & { pathPrefix: string; folderName: string; }

export type ExtendedEndpointData = RawEndpointData & { fullPath: string }
