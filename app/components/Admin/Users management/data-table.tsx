"use client";

import React, { useEffect } from "react";

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { RxChevronDown } from "react-icons/rx";
import { Button } from "@app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@app/components/ui/dropdown-menu";
import { Input } from "@app/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@app/components/ui/table";

import User from "@typings/entities/User";
import getUsers from "@services/api/getUsers";
import paginationType from "@typings/api/pagination";
import { ThreeDots } from "react-loader-spinner";
import {
  ErrorGetUsersResponse,
  SuccessGetUsersResponse,
} from "@typings/api/getUsers";
import Image from "next/image";
import { IMAGES } from "@config";
import AdminUsersColumns from "./columns";
import AdminUsersPagination from "./pagination";

export default function AdminUsersDataTable() {
  const [isFetching, setIsFetching] = React.useState(true);
  const [error, setError] = React.useState<ErrorGetUsersResponse | null>(null);
  const [data, setData] = React.useState<User[]>([]);
  const [page, setPage] = React.useState<string>("1");
  const [pagination, setPagination] = React.useState<paginationType>({
    page: Number(page),
    per_page: 10,
    total: 0,
    pages: 0,
  });

  const columns = AdminUsersColumns({
    page,
    setData,
    setPagination,
    setError,
  });

  useEffect(() => {
    setError(null);
    setIsFetching(true);
    getUsers(page)
      .then((response) => {
        if (response.status === "success") {
          const successData = response as SuccessGetUsersResponse;
          setData(successData.data);
          setPagination(successData.pagination);
        } else {
          const errorData = response as ErrorGetUsersResponse;
          setError(errorData);
        }
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [page]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (isFetching) {
    return (
      <div className="flex flex-col  justify-center py-[10%] items-center">
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#000"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-6 justify-center py-[10%] items-center">
        <Image
          src={IMAGES.SEARCH_ERROR}
          alt="Search error"
          width={300}
          height={300}
        />
        <Button
          onClick={() => {
            setPage("1");
          }}
        >
          {error.message}
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4  bg-white p-4">
      <div className="flex items-center gap-2 py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <RxChevronDown className="ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <AdminUsersPagination pagination={pagination} setPage={setPage} />
      </div>
    </div>
  );
}
