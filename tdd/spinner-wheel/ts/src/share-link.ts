export interface SharedWheel {
  names: string[];
  seed: number;
}

export function encodeShare(shared: SharedWheel): string {
  const bytes = new TextEncoder().encode(JSON.stringify(shared));
  return btoa(String.fromCharCode(...bytes));
}

export function decodeShare(text: string): SharedWheel {
  const bytes = Uint8Array.from(atob(text), (char) => char.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}
