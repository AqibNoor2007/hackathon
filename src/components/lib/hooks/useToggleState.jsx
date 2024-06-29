import { useState } from "react";

const useToggleState = (initialValue = false) => {
  const [isToggle, setIsToggle] = useState(initialValue);

  const onClose = (value) => setIsToggle(value ?? !isToggle);

  const onOpen = (value) => setIsToggle(value ?? !isToggle);

  const handleToggle = (value) => setIsToggle(value);

  return { isToggle, onClose, onOpen, handleToggle };
};

export default useToggleState;
