export interface SharedWheel {
  names: string[];
  seed: number;
  skip?: string;
}

export function encodeShare(shared: SharedWheel): string {
  const bytes = new TextEncoder().encode(JSON.stringify(shared));
  return btoa(String.fromCharCode(...bytes));
}

export function decodeShare(text: string): SharedWheel {
  let data: unknown;
  try {
    const bytes = Uint8Array.from(atob(text), (char) => char.charCodeAt(0));
    data = JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    throw new Error('This link is broken.');
  }
  if (!isSharedWheel(data)) {
    throw new Error('This link is broken.');
  }
  return data;
}

function isSharedWheel(data: unknown): data is SharedWheel {
  if (typeof data !== 'object' || data === null) {
    return false;
  }
  const { names, seed, skip } = data as Record<string, unknown>;
  return (
    Array.isArray(names) &&
    names.every((name) => typeof name === 'string') &&
    typeof seed === 'number' &&
    (skip === undefined || typeof skip === 'string')
  );
}
