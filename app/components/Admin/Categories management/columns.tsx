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

import User, { Category } from "@typings/entities/User";
import { useRouter } from "next/navigation";

import { HiMiniEllipsisHorizontal } from "react-icons/hi2";
import { RxCaretSort } from "react-icons/rx";

const AdminCategoriesColumns = (): ColumnDef<Category>[] => {
  const router = useRouter();

  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
        const categorie = row.original;
        return <div className="capitalize">{categorie.name}</div>;
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="lowercase">{row.original.description}</div>
      ),
    },

    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const category = row.original;

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
               onClick={() => {router.push(`categories/${category.id}/edit`);}}>
                Modifier
              </DropdownMenuItem>
              <DropdownMenuSeparator/>
              
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
};

export default AdminCategoriesColumns;
