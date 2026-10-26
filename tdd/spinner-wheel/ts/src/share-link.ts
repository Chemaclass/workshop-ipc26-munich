export interface SharedWheel {
  names: string[];
  seed: number;
}

export function encodeShare(shared: SharedWheel): string {
  return btoa(JSON.stringify(shared));
}

export function decodeShare(text: string): SharedWheel {
  return JSON.parse(atob(text));
}
