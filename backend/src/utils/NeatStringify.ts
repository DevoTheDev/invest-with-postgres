export const NeatStringify = (obj: any, indent: number = 2): string => {
    try {
        // Custom replacer for circular references to avoid infinite loops
        const cache: any[] = [];
        const result = JSON.stringify(obj, (key, value) => {
            if (typeof value === "object" && value !== null) {
                // If circular reference, we won't include it in the output
                if (cache.includes(value)) {
                    return '[Circular]';
                }
                cache.push(value);
            }
            return value;
        }, indent);

        // Return the neatly formatted string
        return result.replace(/\\/g, '') // Clean up any extra escaped characters
            .replace(/^\{/, "{\n")
            .replace(/\}$/, "\n}")
            .replace(/,/g, ",\n")
            .replace(/:/g, ": ");
    } catch (e) {
        return `Unable to stringify object: ${e}`;
    }
};
