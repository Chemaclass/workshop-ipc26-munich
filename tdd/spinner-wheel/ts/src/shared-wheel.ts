export interface SharedWheel {
  names: string[];
  chosen: string;
  rotation: number;
}

export function encodeSharedWheel(state: SharedWheel): string {
  return `#wheel=${encodeURIComponent(JSON.stringify({ version: 1, ...state }))}`;
}

export function decodeSharedWheel(hash: string): SharedWheel | null {
  const { names, chosen, rotation } = JSON.parse(decodeURIComponent(hash.slice(7)));
  return { names, chosen, rotation };
}
