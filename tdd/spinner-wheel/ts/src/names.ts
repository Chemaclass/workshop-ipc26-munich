export function parseNames(text: string): string[] {
  return numberDuplicates(splitNames(text));
}

function numberDuplicates(names: string[]): string[] {
  const totals = new Map<string, number>();
  for (const name of names) {
    const key = name.toLowerCase();
    totals.set(key, (totals.get(key) ?? 0) + 1);
  }

  const seen = new Map<string, number>();
  return names.map((name) => {
    const key = name.toLowerCase();
    if (totals.get(key) === 1) {
      return name;
    }

    const number = (seen.get(key) ?? 0) + 1;
    seen.set(key, number);

    return `${name} (${number})`;
  });
}

export function removeName(text: string, index: number): string {
  return splitNames(text)
    .filter((_, position) => position !== index)
    .join(', ');
}

function splitNames(text: string): string[] {
  return text
    .split(',')
    .map((name) => name.trim())
    .filter((name) => name !== '');
}
