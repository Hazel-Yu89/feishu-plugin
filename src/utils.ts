export function formatTime(value: number, format: string): string {
  if (isNaN(value) || value === null || value === undefined) return '0';
  if (format === 'TEXT') return String(value);

  const h = Math.floor(value / 3600);
  const m = Math.floor((value % 3600) / 60);
  const s = Math.floor(value % 60);
  const pad = (n: number) => n.toString().padStart(2, '0');

  if (format === 'HH:MM:SS') return `${pad(h)}:${pad(m)}:${pad(s)}`;
  if (format === 'MM:SS') return `${pad(m)}:${pad(s)}`;
  return String(value);
}

export function getDynamicColor(
  value: number,
  condition: string,
  threshold: number,
  targetColor: string,
  defaultColor: string
): string {
  let isMatch = false;
  if (condition === '>') isMatch = value > threshold;
  if (condition === '<') isMatch = value < threshold;
  if (condition === '=') isMatch = value === threshold;
  return isMatch ? targetColor : defaultColor;
}
