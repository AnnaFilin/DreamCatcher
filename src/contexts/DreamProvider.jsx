import { useState } from "react";
import { DreamContext } from "./DreamContext";

export const DreamProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDream, setCurrentDream] = useState(null);

  return (
    <DreamContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        currentDream,
        setCurrentDream,
      }}
    >
      {children}
    </DreamContext.Provider>
  );
};
