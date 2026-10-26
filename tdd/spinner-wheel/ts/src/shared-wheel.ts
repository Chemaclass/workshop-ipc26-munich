export interface SharedWheel {
  names: string[];
  chosen: string;
  rotation: number;
}

export function encodeSharedWheel(state: SharedWheel): string {
  return `#wheel=${encodeURIComponent(JSON.stringify({ version: 1, ...state }))}`;
}

export function decodeSharedWheel(hash: string): SharedWheel | null {
  if (!hash.startsWith('#wheel=')) return null;
  try {
    const data = JSON.parse(decodeURIComponent(hash.slice(7)));
    if (data === null || typeof data !== 'object' || data.version !== 1)
      return null;
    const { names, chosen, rotation } = data;
    if (
      !Array.isArray(names) ||
      names.length === 0 ||
      !names.every(
        (name: unknown) =>
          typeof name === 'string' && name.length > 0 && name === name.trim(),
      ) ||
      new Set(names.map((name: string) => name.toLowerCase())).size !==
        names.length ||
      typeof chosen !== 'string' ||
      !names.includes(chosen) ||
      typeof rotation !== 'number' ||
      !Number.isFinite(rotation) ||
      rotation < 0 ||
      rotation >= 360
    )
      return null;
    const landingAngle = (360 - rotation) % 360;
    if (names[Math.floor((landingAngle / 360) * names.length)] !== chosen)
      return null;
    return { names, chosen, rotation };
  } catch {
    return null;
  }
}
