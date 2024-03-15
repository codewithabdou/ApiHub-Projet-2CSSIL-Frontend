import { Button } from "@app/components/ui/button";
import Pagination from "@typings/api/pagination";
import Link from "next/link";
import React from "react";

const AdminUsersPagination = ({ pagination }: { pagination: Pagination }) => {
  return (
    <div className="space-x-2 flex justify-end">
      <Link href={`?page=${pagination.page - 1}`} passHref>
        <Button variant="outline" size="sm" disabled={pagination.page - 1 <= 0}>
          Previous
        </Button>
      </Link>
      {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
        (item, index) => {
          return (
            <Link key={index} href={`?page=${item}`} passHref>
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page === item}
              >
                {item}
              </Button>
            </Link>
          );
        }
      )}
      <Link href={`?page=${pagination.page + 1}`} passHref>
        <Button
          variant="outline"
          size="sm"
          disabled={pagination.page + 1 > pagination.pages}
        >
          Next
        </Button>
      </Link>
    </div>
  );
};

export default AdminUsersPagination;
