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
import activateApi from "@services/api/activateApi";
import deactivateApi from "@services/api/deactivateApi";

import { ColumnDef } from "@tanstack/react-table";
import { API } from "@typings/entities/API";
import { useRouter } from "next/navigation";

import { HiMiniEllipsisHorizontal } from "react-icons/hi2";

const SupplierAPIsColumns = (): ColumnDef<API>[] => {
  const router = useRouter();
  const columns: ColumnDef<API>[] = [
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const api = row.original;
        return <div className="capitalize">{api.status}</div>;
      },
    },

    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const api = row.original;
        return <div className="capitalize">{api.name}</div>;
      },
    },

    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        const api = row.original;
        return <div className="capitalize">{api.description}</div>;
      },
    },

    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const api = row.original;
        return <div className="capitalize">{api.category.name}</div>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const api = row.original;

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

              <DropdownMenuItem
                onClick={async () => {
                  router.push(`/supplier/apis/${api.id}/createNewVersion`);
                }}
              >
                Creer nouvelle version
              </DropdownMenuItem>


              <DropdownMenuItem
                onClick={async () => {
                  router.push(`/supplier/apis/${api.id}/versions`);
                }}
              >
                Gestion des versions
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  router.push(`/supplier/apis/${api.id}/tickets`);
                }}
              >
                Gestion des tickets
              </DropdownMenuItem>


              {api.status === "active" ? (
                <DropdownMenuItem
                  onClick={async () => {
                    await deactivateApi(api.id.toString());
                  }}
                >
                  Desactiver
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={async () => {
                    await activateApi(api.id.toString());
                  }}
                >
                  Activer
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

export default SupplierAPIsColumns;
