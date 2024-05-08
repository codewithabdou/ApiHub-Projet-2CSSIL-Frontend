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
import { ColumnDef } from "@tanstack/react-table";

import User from "@typings/entities/User";
import { useRouter } from "next/navigation";
import { HiMiniEllipsisHorizontal } from "react-icons/hi2";
import { RxCaretSort } from "react-icons/rx";

const AdminSuppliersColumns = (): ColumnDef<User>[] => {
  const router = useRouter();

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
                Copy Supplier ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {user.status === "active" ? (
                <DropdownMenuItem
                  onClick={async () => {
                    await deactivateUser(user.id.toString());
                    
                  }}
                >
                  Deactivate
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={async () => {
                    await activateUser(user.id.toString());
                  }}
                >
                  Activate
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => {

                  router.push(`suppliers/${user.id}`);
                  
                }}
              >
                Voir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
};

export default AdminSuppliersColumns;
