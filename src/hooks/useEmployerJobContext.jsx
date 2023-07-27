import { useContext } from "react";
import { employerJobContext } from "../contexts/employerJobContext";

export const useEmployerJobContext = () => {
  return useContext(employerJobContext);
};
