export function formatHexColor(hexColor: string): string {
    return hexColor.startsWith('#') ? hexColor.slice(1) : hexColor;
}