"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NeatStringify = void 0;
const NeatStringify = (obj, indent = 2) => {
    try {
        // Custom replacer for circular references to avoid infinite loops
        const cache = [];
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
    }
    catch (e) {
        return `Unable to stringify object: ${e}`;
    }
};
exports.NeatStringify = NeatStringify;
