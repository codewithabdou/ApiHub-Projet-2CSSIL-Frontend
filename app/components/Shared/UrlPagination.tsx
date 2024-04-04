"use client";
import { Button } from "@app/components/ui/button";
import Pagination from "@typings/api/pagination";
import Link from "next/link";
import React from "react";
import { useSearchParams , usePathname } from 'next/navigation'

const UrlPagination = ({ pagination  }: { pagination: Pagination  }) => {
    let urlContainsSearchParams : boolean
    let url = usePathname()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams.toString())
    if (params.has("page")){
        params.delete("page")
    }
    
    if (params.size > 0 ){
        urlContainsSearchParams = true
        url = usePathname()+"?"+params.toString() ;
    }else urlContainsSearchParams = false

  return (
    <div className="space-x-2 flex justify-end">

        <Button variant="outline" size="sm" disabled={pagination.page - 1 <= 0}  >
      <Link href={ urlContainsSearchParams ? `${url}&page=${pagination.page - 1}` : `?page=${pagination.page - 1}`} passHref >
          Previous
      </Link>
        </Button>
      {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
        (item, index) => {
          return (
            <Button
                variant="outline"
                size="sm"
                disabled={pagination.page === item}
              >
            <Link key={index} href={`?page=${item}`} passHref>
                {item}
            </Link>
              </Button>
          );
        }
      )}
        <Button
          variant="outline"
          size="sm"
          disabled={pagination.page + 1 > pagination.pages}
        >
      <Link href={ urlContainsSearchParams ? `${url}&page=${pagination.page + 1}` : `?page=${pagination.page + 1}`} passHref>
          Next
      </Link>
        </Button>
    </div>
  );
};

export default UrlPagination;
