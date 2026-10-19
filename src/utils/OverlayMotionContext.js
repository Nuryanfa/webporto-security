import { createContext, useContext } from "react";

export const OverlayMotionContext = createContext(false);
export const useOverlayMotion = () => useContext(OverlayMotionContext);
