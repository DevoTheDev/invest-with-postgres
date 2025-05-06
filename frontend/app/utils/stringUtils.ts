export function capitalize(key?: unknown): string | undefined {
  if (typeof key !== "string" || !key) {
    return undefined;
  }

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


export function formatRoute(route: string): string {
  // Handle empty or invalid input
  if (!route || typeof route !== 'string') {
    return '';
  }

  // Remove leading slash
  const cleanedRoute = route.replace(/^\/+/, '');

  // Capitalize first letter, preserve rest
  if (cleanedRoute.length === 0) {
    return '';
  }
  return cleanedRoute.charAt(0).toUpperCase() + cleanedRoute.slice(1);
}

export const formatPhoneNumber = (number: string): string => {
  if (!number) return '';
  const cleaned = number.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : number;
};

export const formatDate = (dateStr?: string): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateTime = (dateStr?: string): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
