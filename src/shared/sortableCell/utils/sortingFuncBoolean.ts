export const sortingFuncBoolean = (param: string, field: string | undefined): boolean => {
  if (field === undefined) return false;
  return Boolean(field.includes(param));
};
