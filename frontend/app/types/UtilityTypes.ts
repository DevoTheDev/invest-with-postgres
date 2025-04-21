export type HideOptions<T extends object> = {
    [K in keyof T as `hide${Capitalize<string & K>}`]?: boolean;
  };
  