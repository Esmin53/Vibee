import { Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { createContext, FC } from "react";

type SidebarContextType = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>

};

const SidebarContext = createContext<SidebarContextType>({
  isSidebarOpen: true,
  setIsSidebarOpen: (): boolean => false
});

const OpenSidebar: FC<{ children: ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default OpenSidebar

export const useSidebarContext = () => useContext(SidebarContext)