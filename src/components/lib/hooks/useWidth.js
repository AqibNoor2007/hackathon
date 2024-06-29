import { useState, useEffect } from "react";

const useWidth = (targetWidth) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > (targetWidth ?? 768)) {
        setIsMobile(false);
      } else {
        setIsMobile(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [targetWidth]);
  return { isMobile };
};

export default useWidth;
