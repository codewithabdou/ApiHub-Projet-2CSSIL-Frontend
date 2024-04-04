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
import activateVersion from "@services/api/activateVersion";
import deactivateVersion from "@services/api/deactivateVersion";

import { ColumnDef } from "@tanstack/react-table";
import { Version } from "@typings/entities/Versions";

import { HiMiniEllipsisHorizontal } from "react-icons/hi2";

const SupplierAPIVersionsColumns = (apiId: number): ColumnDef<Version>[] => {
  const columns: ColumnDef<Version>[] = [
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const version = row.original;
        return <div className="capitalize">{version.status}</div>;
      },
    },

    {
      enableHiding: false,
      accessorKey: "version",
      header: "Version",
      cell: ({ row }) => {
        const version = row.original;
        return <div className="capitalize">{version.version}</div>;
      },
    },

    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const version = row.original;

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

              <DropdownMenuSeparator />

              {version.status === "active" ? (
                <DropdownMenuItem
                  onClick={async () => {
                    await deactivateVersion({
                      apiId: apiId.toString(),
                      version: version.version as string,
                    });
                  }}
                >
                  Deactivate
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={async () => {
                    await activateVersion({
                      apiId: apiId.toString(),
                      version: version.version as string,
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

export default SupplierAPIVersionsColumns;
