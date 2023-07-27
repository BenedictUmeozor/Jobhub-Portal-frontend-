import { useContext } from "react";
import { ApplicationContext } from "../contexts/applicationContext";

export const useAppllicationContext = () => {
  return useContext(ApplicationContext);
};
