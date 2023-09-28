const asyncForEach = async<ArrayItemType, CallbackResultType>(
  array: ArrayItemType[],
  callback: (arg: ArrayItemType, index: number) => Promise<CallbackResultType>,
): Promise<CallbackResultType[]> => {
  const results: CallbackResultType[] = [];

  for (let i = 0; i < array.length; i++) {
    const item = array[i];

    const result = await callback(item, i); // eslint-disable-line no-await-in-loop
    results.push(result);
  }

  return results;
};

export default asyncForEach;
