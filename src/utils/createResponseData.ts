export interface ResponseDataType<D = unknown, M = unknown> {
  data: D | null;
  message: string;
  meta: M | Record<string, never>;
}

const createResponseData = <D, M>(data: D, params: {
  message?: string;
  meta?: M
} = {}): ResponseDataType<D, M> => {
  return {
    data: data || null,
    message: params.message || 'Success',
    meta: params.meta || {},
  };
};

export default createResponseData;
