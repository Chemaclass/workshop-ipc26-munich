export interface SharedWheel {
  names: string[];
  chosen: string;
  rotation: number;
}

export function encodeSharedWheel(state: SharedWheel): string {
  const payload = JSON.stringify([
    state.names,
    state.names.indexOf(state.chosen),
    state.rotation,
  ]);
  const bytes = new TextEncoder().encode(payload);
  const token = btoa(
    Array.from(bytes, (byte) => String.fromCharCode(byte)).join(''),
  )
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  return `#w=${token}`;
}

export function decodeSharedWheel(hash: string): SharedWheel | null {
  if (!hash.startsWith('#wheel=') && !hash.startsWith('#w=')) return null;
  try {
    let data: {
      version?: unknown;
      names?: unknown;
      chosen?: unknown;
      rotation?: unknown;
    };
    if (hash.startsWith('#w=')) {
      const binary = atob(hash.slice(3).replace(/-/g, '+').replace(/_/g, '/'));
      const bytes = Uint8Array.from(binary, (character) =>
        character.charCodeAt(0),
      );
      const [names, chosenIndex, rotation] = JSON.parse(
        new TextDecoder('utf-8', { fatal: true }).decode(bytes),
      );
      data = { version: 1, names, chosen: names[chosenIndex], rotation };
    } else {
      data = JSON.parse(decodeURIComponent(hash.slice(7)));
    }
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
