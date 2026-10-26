export type ShareState = {
  names: string[];
  index: number;
};

export const toShareHash = (names: string[], index: number): string => {
  const params = new URLSearchParams();
  for (const name of names) {
    params.append('n', name);
  }
  params.set('i', String(index));
  return `#${params.toString()}`;
};

export const fromShareHash = (hash: string): ShareState | null => {
  const raw = hash.startsWith('#') ? hash.slice(1) : hash;
  if (raw.length === 0) {
    return null;
  }

  const params = new URLSearchParams(raw);
  const names = params.getAll('n');
  const indexRaw = params.get('i');

  if (indexRaw === null || !/^-?\d+$/.test(indexRaw)) {
    return null;
  }

  const index = Number(indexRaw);
  if (!Number.isInteger(index) || index < 0 || index >= names.length) {
    return null;
  }

  if (names.length < 2) {
    return null;
  }

  if (new Set(names).size !== names.length) {
    return null;
  }

  return { names, index };
};
