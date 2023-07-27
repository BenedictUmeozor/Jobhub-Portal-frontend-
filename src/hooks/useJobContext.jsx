import { useContext } from "react";
import { jobContext } from "../contexts/jobContext";

export const useJobContext = () => {
  return useContext(jobContext);
};
