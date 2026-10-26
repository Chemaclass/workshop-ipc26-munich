export interface SharedWheel {
  names: string[];
  chosen: string;
  rotation: number;
}

function encodeBytes(bytes: Uint8Array): string {
  return btoa(Array.from(bytes, (byte) => String.fromCharCode(byte)).join(''))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export function encodeSharedWheel(state: SharedWheel): string {
  const payload = JSON.stringify([
    state.names,
    state.names.indexOf(state.chosen),
    state.rotation,
  ]);
  const bytes = new TextEncoder().encode(payload);
  const compact = `#w=${encodeBytes(bytes)}`;
  // Preserve the exact float while omitting unused trailing mantissa bytes.
  const angleBytes = new Uint8Array(8);
  new DataView(angleBytes.buffer).setFloat64(0, state.rotation);
  let length = angleBytes.length;
  while (length > 1 && angleBytes[length - 1] === 0) length -= 1;
  const angle = encodeBytes(angleBytes.subarray(0, length));
  const names = state.names
    .map((name) => encodeURIComponent(name).replace(/\./g, '%2E'))
    .join('.');
  const shorter = `#r=${angle}.${names}`;
  const chosenIndex = Math.floor(
    (((360 - state.rotation) % 360) / 360) * state.names.length,
  );
  return shorter.length < compact.length &&
    state.names[chosenIndex] === state.chosen
    ? shorter
    : compact;
}

export function decodeSharedWheel(hash: string): SharedWheel | null {
  if (
    !hash.startsWith('#wheel=') &&
    !hash.startsWith('#w=') &&
    !hash.startsWith('#r=')
  )
    return null;
  try {
    let data: {
      version?: unknown;
      names?: unknown;
      chosen?: unknown;
      rotation?: unknown;
    };
    if (hash.startsWith('#r=')) {
      const [angle, ...encodedNames] = hash.slice(3).split('.');
      if (!angle || encodedNames.length === 0) return null;
      const binary = atob(angle.replace(/-/g, '+').replace(/_/g, '/'));
      if (binary.length === 0 || binary.length > 8) return null;
      const bytes = new Uint8Array(8);
      bytes.set(
        Uint8Array.from(binary, (character) => character.charCodeAt(0)),
      );
      const rotation = new DataView(bytes.buffer).getFloat64(0);
      const names = encodedNames.map((name) => decodeURIComponent(name));
      const chosenIndex = Math.floor(
        (((360 - rotation) % 360) / 360) * names.length,
      );
      data = { version: 1, names, chosen: names[chosenIndex], rotation };
    } else if (hash.startsWith('#w=')) {
      const binary = atob(hash.slice(3).replace(/-/g, '+').replace(/_/g, '/'));
      const bytes = Uint8Array.from(binary, (character) =>
        character.charCodeAt(0),
      );
      const payload = JSON.parse(
        new TextDecoder('utf-8', { fatal: true }).decode(bytes),
      );
      if (!Array.isArray(payload) || payload.length !== 3) return null;
      const [names, chosenIndex, rotation] = payload;
      if (
        !Array.isArray(names) ||
        !Number.isInteger(chosenIndex) ||
        chosenIndex < 0 ||
        chosenIndex >= names.length
      )
        return null;
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
