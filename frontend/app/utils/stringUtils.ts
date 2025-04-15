export function capitalize(key: string) {
    return key.charAt(0).toUpperCase() + key.slice(1);
}

// Utility function to convert camelCase or snake_case to readable format
export const formatHeader = (key: string): string => {
    // Handle snake_case by splitting at underscores and capitalizing
    if (key.includes('_')) {
      return key
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
  
    // Handle camelCase by inserting spaces before capital letters and capitalizing
    return key
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert space before capital letters
      .replace(/^[a-z]/, str => str.toUpperCase()); // Capitalize the first letter
  };
