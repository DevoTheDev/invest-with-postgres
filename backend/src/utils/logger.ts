import { NeatStringify } from "./NeatStringify";

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m', // Success
  red: '\x1b[31m', // Error
  yellow: '\x1b[33m', // Warning
  blue: '\x1b[34m', // In progress
  white: '\x1b[97m', // Info
  gray: '\x1b[90m', // Secondary text
};

const emojis = {
  success: '✅',
  warning: '⚠️',
  error: '❌',
  inProgress: '🔄',
  info: 'ℹ️',
};

const getTimeStamp = () => {
  const now = new Date();
  return now.toISOString().replace('T', ' ').slice(0, -1); // YYYY-MM-DD HH:MM:SS.SSS
};

// Truncate long strings to fit within the log box
const truncate = (str: string, maxLength: number) =>
  str.length > maxLength ? `${str.slice(0, maxLength - 3)}...` : str;

// Pad and align text
const padEnd = (str: string, length: number) => str.padEnd(length, ' ');

// Solid border with log type color
const solidBorder = (length: number, color: string, isTop = false) => {
  const chars = isTop ? '═╦═' : '═╩═';
  return color + chars.repeat(Math.floor(length / 3) + 1).slice(0, length) + colors.reset;
};

// Internal separator for spacing
const internalSeparator = (length: number, color: string) =>
  color + `╟${'─'.repeat(length - 2)}╢` + colors.reset;

// Get caller info
const getCallerInfo = () => {
  try {
    const err = new Error();
    const stack = err.stack?.split('\n')[3] || '';
    const match = stack.match(/\(([^:]+):(\d+):\d+\)/) || stack.match(/at ([^\s]+) ([^:]+):(\d+):\d+/);
    if (match) {
      const file = match[1].split('/').pop() || 'unknown';
      const line = match[2];
      return `${file}:${line}`;
    }
    return 'unknown';
  } catch {
    return 'unknown';
  }
};

interface LogOptions {
  context?: Record<string, any>;
  theme?: 'neon' | 'dark' | 'minimal';
}

export const logMessage = (
  type: 'success' | 'warning' | 'error' | 'inProgress' | 'info',
  message: string,
  obj?: any,
  options: LogOptions = {}
) => {
  const { context = {}, theme = 'neon' } = options;

  // Theme-specific colors
  const themeColors = {
    neon: { text: colors.gray },
    dark: { text: colors.gray },
    minimal: { text: colors.reset },
  };
  const { text } = themeColors[theme];

  // Log type configuration
  let color: string, emoji: string, badge: string;
  switch (type) {
    case 'success':
      color = colors.green;
      emoji = emojis.success;
      badge = '[SUCCESS]';
      break;
    case 'warning':
      color = colors.yellow;
      emoji = emojis.warning;
      badge = '[WARNING]';
      break;
    case 'error':
      color = colors.red;
      emoji = emojis.error;
      badge = '[ERROR]';
      break;
    case 'inProgress':
      color = colors.blue;
      emoji = emojis.inProgress;
      badge = '[IN PROGRESS]';
      break;
    case 'info':
      color = colors.white;
      emoji = emojis.info;
      badge = '[INFO]';
      break;
    default:
      color = colors.white;
      emoji = emojis.info;
      badge = '[INFO]';
  }

  // Layout constants
  const boxWidth = 50;
  const innerWidth = boxWidth - 6; // 2 spaces padding on each side
  const timestamp = getTimeStamp();
  const caller = getCallerInfo();
  const env = process.env.NODE_ENV || 'development';
  const truncatedMessage = truncate(message, innerWidth - 4);

  // Format object
  const formattedObj = obj
    ? NeatStringify(obj)
        .split('\n')
        .map((line: string) => `║  ${padEnd(truncate(line, innerWidth - 2), innerWidth - 2)}  ║`)
        .join('\n')
    : '';

  // Format context
  const contextLines = Object.entries(context)
    .map(([key, value]) => `║  ${padEnd(`${key}: ${truncate(String(value), innerWidth - 10)}`, innerWidth - 2)}  ║`)
    .join('\n');
  const hasContext = Object.keys(context).length > 0;

  // Build log message
  const formattedMessage = `
${color}${solidBorder(boxWidth, color, true)}${colors.reset}
${color}║  ${emoji} ${badge.padEnd(innerWidth - 2, ' ')}  ║${colors.reset}
${color}${internalSeparator(boxWidth, color)}${colors.reset}
${color}║${' '.repeat(innerWidth + 2)}║${colors.reset}
${text}║  📅 ${padEnd(timestamp, innerWidth - 4)}  ║${colors.reset}
${text}║  📍 ${padEnd(caller, innerWidth - 4)}  ║${colors.reset}
${text}║  🌐 ${padEnd(`ENV: ${env}`, innerWidth - 4)}  ║${colors.reset}
${color}║${' '.repeat(innerWidth + 2)}║${colors.reset}
${color}${internalSeparator(boxWidth, color)}${colors.reset}
${color}║  📝 ${padEnd(truncatedMessage, innerWidth - 4)}  ║${colors.reset}
${formattedObj ? `${color}${internalSeparator(boxWidth, color)}${colors.reset}\n${text}${formattedObj}${colors.reset}` : ''}
${hasContext ? `${color}${internalSeparator(boxWidth, color)}${colors.reset}\n${text}${contextLines}${colors.reset}` : ''}
${color}║${' '.repeat(innerWidth + 2)}║${colors.reset}
${color}${solidBorder(boxWidth, color, false)}${colors.reset}
`;

  console.log(message);
};