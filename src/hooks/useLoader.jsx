import { useState } from "react";
import { PropagateLoader } from "react-spinners";

const useLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const override = {
    position: "absolute",
    top: " 50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "6666",
  };

  const Loader = () => (
    <>
      <PropagateLoader
        color={"blue"}
        loading={isLoading}
        cssOverride={override}
        size={25}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      {isLoading && (
        <div className="fixed bg-slate-500 opacity-[.3] z-[6665] w-full h-full"></div>
      )}
    </>
  );
  return { setIsLoading, Loader };
};

export default useLoader;
