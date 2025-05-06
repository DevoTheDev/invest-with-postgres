import { capitalize } from "../utils/stringUtils";

export type HideOptions<T extends object> = {
  [K in keyof T as `hide_${Capitalize<string & K>}`]?: boolean;
};

export type TailwindOptions<T extends object> = {
  container_style?: string;
  key_container_style?: string,
  button_style?: string,
  map_item_style?: {
    key?: string,
    val?: string,
  }
} & {
  [K in keyof T as `${Capitalize<string & K>}_style`]?: {
    key?: string,
    val?: string,
  };
}

export const targeted = (targeting: any, key?: string,) => {

  const hide = targeting[`hide_${capitalize(key)}` as string] as boolean;
  const containerStyle = targeting["container_style" as string] as string;
  const keyContainerStyle: string = targeting["key_container_style" as string] as string;
  const buttonStyle = targeting["button_style" as string] as string;
  const keyStyle = targeting[`${capitalize(key)}_style` as string] as {
    key?: string,
    val?: string,
  }
  const mappedStyle = targeting["map_item_style" as string] as {
    key?: string,
    val?: string,
  }

  let style;

  if(keyStyle) {
    style = keyStyle
  } else {
    if(mappedStyle) {
      style = mappedStyle
    }
  }

  return {
    hide,
    style,
    buttonStyle,
    keyContainerStyle,
    containerStyle,
  }

}