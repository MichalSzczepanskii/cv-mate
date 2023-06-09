export const titleCaseTransformer = (input: string) => {
  return input.toUpperCase().slice(0, 1) + input.slice(1).toLowerCase();
};
