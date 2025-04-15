import { NeatStringify } from "./neatStringify";

const colors = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    red: "\x1b[31m",
    blue: "\x1b[34m",
    cyan: "\x1b[36m",
};

const emojis = {
    success: "✅",
    warning: "⚠️",
    error: "❌",
    inProgress: "🔄",
};

const getTimeStamp = () => {
    const now = new Date();
    return now.toISOString().replace("T", " ").slice(0, -5); // Formats: YYYY-MM-DD HH:MM:SS
};

// Function to handle the log formatting for different types
export const logMessage = (
    type: "success" | "warning" | "error" | "inProgress" | "info",
    message: string,
    obj?: any
) => {
    let color, emoji, label;

    switch (type) {
        case "success":
            color = colors.green;
            emoji = emojis.success;
            label = " SUCCESS ";
            break;
        case "warning":
            color = colors.yellow;
            emoji = emojis.warning;
            label = " WARNING ";
            break;
        case "error":
            color = colors.red;
            emoji = emojis.error;
            label = " ERROR ";
            break;
        case "inProgress":
            color = colors.blue;
            emoji = emojis.inProgress;
            label = " IN PROGRESS ";
            break;
        case "info":
            color = colors.cyan;
            emoji = "ℹ️";
            label = " INFO ";
            break;
        default:
            color = colors.cyan;
            emoji = "ℹ️";
            label = " INFO ";
    }

    const formattedMessage = `
${color}╔════════════════════════════════════════╗
║${emoji} ${label.padEnd(25, " ")}║
╟────────────────────────────────────────╢
║ 📅 ${getTimeStamp()}            ║
║ 📝 ${message.padEnd(30, " ")}║
${obj ? `║ ${NeatStringify(obj).padEnd(40, " ")}║` : ''}
╚════════════════════════════════════════╝${colors.reset}
`;

    console.log(formattedMessage);
};