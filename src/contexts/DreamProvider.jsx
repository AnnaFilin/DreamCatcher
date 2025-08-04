import { useState } from "react";
import { DreamContext } from "./DreamContext";

export const DreamProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDream, setCurrentDream] = useState(null);
  const [justGenerated, setJustGenerated] = useState(false);

  return (
    <DreamContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        currentDream,
        setCurrentDream,
        justGenerated,
        setJustGenerated,
      }}
    >
      {children}
    </DreamContext.Provider>
  );
};
