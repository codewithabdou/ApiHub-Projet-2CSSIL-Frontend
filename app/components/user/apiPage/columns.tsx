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
import activateKey from "@services/api/apiPage/activateKey";
import deactivateKey from "@services/api/apiPage/deactivateKey";

import { ColumnDef } from "@tanstack/react-table";
import { key } from "@typings/api/keys";
import { HiMiniEllipsisHorizontal } from "react-icons/hi2";

const KeysColumns = (): ColumnDef<key>[] => {
  const columns: ColumnDef<key>[] = [
    {
        enableHiding: false,
        accessorKey: "Clé",
        header: "Clé",
        cell: ({ row }) => {
          const key = row.original;
          return <div >{key.key}</div>;
        },
      },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const key = row.original;
        return <div className="capitalize">{key.status}</div>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const key = row.original;

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

              {key.status === "active" ? (
                <DropdownMenuItem
                  onClick={async () => {
                    await deactivateKey({key:key.key});
                  }}
                >
                  Desactiver
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={async () => {
                    await activateKey(
                      {key:key.key}
                    )
                  }}
                >
                  Activer
                </DropdownMenuItem>
              )}
               <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(key.key)}
            >
              Copier la clé
            </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
};

export default KeysColumns;
