import { createContext, FC, useContext, useMemo, useState } from "react";

export const PopContext = createContext<any>({pop: '', setMobileOpen: (setPop: '')=>{}})

PopContext.displayName = 'PopContext'

export const PopProvider: FC = (props) => {
  const [pop, setPop] = useState('')

  // const value = useMemo(
  //   () => ({
  //     pop,
  //     setPop,
  //   }),
  //   [pop]
  // );

  return <PopContext.Provider value={{pop, setPop}} {...props} />
}

export const usePop = () => {
  const context = useContext(PopContext);
  if (context === undefined) {
    throw new Error("usePop must be used within a PopProvider");
  }
  return context;
}
