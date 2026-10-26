export function pickRandomName(names: string[]): string | undefined {
  const index = Math.floor(Math.random() * names.length);
  return names[index];
}
