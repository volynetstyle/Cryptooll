import { useState } from "react";

const useBit = (
  initialValue = 0
): [number, (position: number) => void, (position: number) => void] => {
  const [bits, setBits] = useState<number>(initialValue);

  const setBit = (position: number) => setBits(bits | (1 << position));
  const clearBit = (position: number) => setBits(bits & ~(1 << position));

  return [bits, setBit, clearBit];
};

export { useBit };
