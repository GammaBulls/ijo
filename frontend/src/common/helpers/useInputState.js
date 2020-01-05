import { useState, useCallback } from "react";

const useInputState = (initial = "") => {
  const [value, setValue] = useState(initial);

  const handleValueChange = useCallback(event => {
    setValue(event.target.value);
  }, []);

  return [value, handleValueChange];
};

export default useInputState;
