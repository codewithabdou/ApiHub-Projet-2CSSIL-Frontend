"use client";

import React, { useEffect } from "react";

import {
  ColumnDef,
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

import { RxCaretSort, RxChevronDown } from "react-icons/rx";
import { HiMiniEllipsisHorizontal } from "react-icons/hi2";
import { Button } from "@app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import deactivateUser from "@services/api/deactivateUser";
import activateUser from "@services/api/activateUser";

export default function AdminUsersPage() {
  const [isFetching, setIsFetching] = React.useState(true);
  const [error, setError] = React.useState<ErrorGetUsersResponse | null>(null);
  const [data, setData] = React.useState<User[]>([]);
  const [page, setPage] = React.useState("1");
  const [pagination, setPagination] = React.useState<paginationType>({
    page: Number(page),
    per_page: 10,
    total: 0,
    pages: 0,
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

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const user = row.original;
        return <div className="capitalize">{user.status}</div>;
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <RxCaretSort className="ml-2" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },

    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <HiMiniEllipsisHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(user.id.toString())
                }
              >
                Copy User ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {user.status === "active" ? (
                <DropdownMenuItem
                  onClick={async () => {
                    await deactivateUser(user.id.toString());
                    getUsers(page).then((response) => {
                      if (response.status === "success") {
                        const successData = response as SuccessGetUsersResponse;
                        setData(successData.data);
                        setPagination(successData.pagination);
                      } else {
                        const errorData = response as ErrorGetUsersResponse;
                        setError(errorData);
                      }
                    });
                  }}
                >
                  Deactivate
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={async () => {
                    await activateUser(user.id.toString());
                    getUsers(page).then((response) => {
                      if (response.status === "success") {
                        const successData = response as SuccessGetUsersResponse;
                        setData(successData.data);
                        setPagination(successData.pagination);
                      } else {
                        const errorData = response as ErrorGetUsersResponse;
                        setError(errorData);
                      }
                    });
                  }}
                >
                  Activate
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
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
      </div>
      <div className="space-x-2 flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((prev) => (Number(prev) - 1).toString())}
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
          onClick={() => setPage((prev) => (Number(prev) + 1).toString())}
          disabled={pagination.page + 1 > pagination.pages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
