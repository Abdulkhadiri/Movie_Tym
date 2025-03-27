import { createContext, useState } from "react";

export const DropdownContext = createContext();

export const DropdownProvider = ({ children }) => {
  const [Location, setLocation] = useState("");

  return (
    <DropdownContext.Provider value={{ Location,setLocation }}>
      {children}
    </DropdownContext.Provider>
  );
};