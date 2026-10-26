const FULL_TURN = 360;
const FULL_TURNS_PER_SPIN = 5;

export function segmentAngle(count: number): number {
  return FULL_TURN / count;
}

export function targetRotation(winnerIndex: number, count: number): number {
  const segmentCentre = (winnerIndex + 0.5) * segmentAngle(count);

  return FULL_TURN - segmentCentre;
}

export function spinRotation(
  currentRotation: number,
  winnerIndex: number,
  count: number,
): number {
  const afterFullTurns = currentRotation + FULL_TURNS_PER_SPIN * FULL_TURN;
  const rest = withinOneTurn(
    targetRotation(winnerIndex, count) - afterFullTurns,
  );

  return afterFullTurns + rest;
}

function withinOneTurn(angle: number): number {
  return ((angle % FULL_TURN) + FULL_TURN) % FULL_TURN;
}
