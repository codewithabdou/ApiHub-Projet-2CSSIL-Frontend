import { Button } from "@app/components/ui/button";
import Pagination from "@typings/api/pagination";
import React from "react";

const AdminUsersPagination = ({
  pagination,
  setPage,
}: {
  pagination: Pagination;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="space-x-2 flex justify-end">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setPage((prev: string) => (Number(prev) - 1).toString())}
        disabled={pagination.page - 1 <= 0}
      >
        Previous
      </Button>
      {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
        (item, index) => {
          return (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => setPage(item.toString())}
              disabled={pagination.page === item}
            >
              {item}
            </Button>
          );
        }
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setPage((prev: string) => (Number(prev) + 1).toString())}
        disabled={pagination.page + 1 > pagination.pages}
      >
        Next
      </Button>
    </div>
  );
};

export default AdminUsersPagination;
