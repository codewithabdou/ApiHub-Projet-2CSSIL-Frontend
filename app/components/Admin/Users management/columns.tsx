"use client";

import { Button } from "@app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@app/components/ui/dropdown-menu";
import activateUser from "@services/api/activateUser";
import deactivateUser from "@services/api/deactivateUser";
import getUsers from "@services/api/getUsers";
import { ColumnDef } from "@tanstack/react-table";
import {
  ErrorGetUsersResponse,
  SuccessGetUsersResponse,
} from "@typings/api/getUsers";
import Pagination from "@typings/api/pagination";
import User from "@typings/entities/User";
import { HiMiniEllipsisHorizontal } from "react-icons/hi2";
import { RxCaretSort } from "react-icons/rx";

const AdminUsersColumns = ({
  page,
  setData,
  setPagination,
  setError,
}: {
  page: string;
  setData: React.Dispatch<React.SetStateAction<User[]>>;
  setPagination: React.Dispatch<React.SetStateAction<Pagination>>;
  setError: React.Dispatch<React.SetStateAction<ErrorGetUsersResponse | null>>;
}): ColumnDef<User>[] => {
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

  return columns;
};

export default AdminUsersColumns;
