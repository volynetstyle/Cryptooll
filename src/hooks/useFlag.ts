import { useState } from "react";

const useFlag = (
  initialValue: boolean = false
): [boolean, () => void, () => void] => {
  const [flag, setFlag] = useState<boolean>(initialValue);

  const enable = () => setFlag(true);
  const disable = () => setFlag(false);

  return [flag, enable, disable];
};

export { useFlag };
