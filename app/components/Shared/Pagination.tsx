import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
  } from "@app/components/ui/pagination"
  import { useEffect, useState } from 'react'
  
function PaginationBar(props:any) {
   const [it,setIt]=useState(0)
  return (
    <Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious
          className={
            props.startIndex === 0 ? "pointer-events-none opacity-50" : undefined
          }
          onClick={() => {
            props.setRefresh(5);
            props.setStartIndex(props.startIndex - props.rowsPerPage);
            props.setEndIndex(props.endIndex - props.rowsPerPage);
          }} />
      </PaginationItem>

      <PaginationItem>
        <PaginationNext
          className={
            props.endIndex === props.length ? "pointer-events-none opacity-50" : undefined
          }
          onClick={() => {
            props.setRefresh(6);
            props.setStartIndex(props.startIndex + props.rowsPerPage); 
            props.setEndIndex(props.endIndex + props.rowsPerPage); 
          }} />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
  )
}

export default PaginationBar