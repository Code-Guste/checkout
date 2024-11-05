const replaceParams = (template: string, params: Record<string, unknown> = {}) => {
  return Object.keys(params).reduce((acc, key) => acc.replace(`:${key}`, String(params[key])), template);
};

// Based on https://davidtimms.github.io/programming-languages/typescript/2020/11/20/exploring-template-literal-types-in-typescript-4.1.html
type PathParams<Path extends string> = Path extends `${string}:${infer Param}/${infer Rest}`
  ? Param | PathParams<Rest>
  : Path extends `${string}:${infer Param}`
    ? Param
    : never;

type PathArgs<Path extends string> = {
  [K in PathParams<Path>]: string;
};

const defineRoute = <P extends string>(template: P) => {
  type Params = PathParams<P>;
  return {
    template,
    buildLink: (params: Params extends never ? void : PathArgs<P>) =>
      replaceParams(template, params as PathArgs<P> | undefined),
  } as const;
};

export const RouteConfig = {
  Home: defineRoute('/'),
  CheckoutPage: defineRoute('/checkout/:id'),
};
