interface DynamicConfig {
    base?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    hover?: string;
    focus?: string;
  }
  
  const DynamicStyling = (props: DynamicConfig): string => {
    const prefixMap: Record<keyof DynamicConfig, string> = {
      base: '',
      sm: 'sm:',
      md: 'md:',
      lg: 'lg:',
      xl: 'xl:',
      hover: 'hover:',
      focus: 'focus:',
    };
  
    const x = Object.entries(props)
    .flatMap(([key, value]) => {
      if (!value) return [];
      const prefix = prefixMap[key as keyof DynamicConfig];
      return value
        .split(" ")
        .map((cls: any) => `${prefix}${cls}`);
    })
    .join(" ");

    return x;
  };
  
  export default DynamicStyling;
  