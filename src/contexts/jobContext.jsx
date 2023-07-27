import { createContext, useEffect, useState } from "react";

export const jobContext = createContext();

export const JobContextProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [data, setData] = useState([]);

  const itemsPerPage = 5;

  const fetchJobs = async () => {
    const response = await fetch(
      `http://localhost:3000/api/jobs?page=${currentPage}&limit=${itemsPerPage}`
    );
    const { jobs, totalCount } = await response.json();

    setData(jobs);
    setTotalPages(Math.ceil(totalCount / itemsPerPage));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchJobs();
  }, [currentPage]);

  return (
    <jobContext.Provider
      value={{ currentPage, totalPages, data, handlePageChange }}
    >
      {children}
    </jobContext.Provider>
  );
};
