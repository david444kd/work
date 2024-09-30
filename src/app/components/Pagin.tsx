import { Pagination } from "@nextui-org/react";
import React from "react";

interface PaginProps {
  totalPosts: number;
  postPerPage: number;
  currentPage: number;
  setPage: (page: number) => void;
}

const Pagin: React.FC<PaginProps> = ({
  totalPosts,
  postPerPage,
  currentPage,
  setPage,
}) => {
  const totalPages = Math.ceil(totalPosts / postPerPage);

  return (
    <div>
      <Pagination
        total={totalPages}
        initialPage={currentPage}
        onChange={setPage}
      />
    </div>
  );
};

export default Pagin;
