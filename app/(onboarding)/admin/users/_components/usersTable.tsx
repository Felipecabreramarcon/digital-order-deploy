"use client";

import { GenericTable } from "@/app/components/generic-table";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { UserModal } from "../form/user-modal";
import { FormatedUser } from "../page";
import { ActionsMenu } from "../../_components/actions-cell";

export default function UsersTable({ users }: { users: FormatedUser[] }) {
  return <GenericTable columns={columns} data={users} />;
}

export const columns: ColumnDef<FormatedUser>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "roleLabel",
    header: "Cargo",
    cell: ({ row }) => <Badge>{row.getValue("roleLabel")}</Badge>,
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const vals = row.original;
      return <ActionsMenu toEditValues={vals} FormModal={UserModal} />;
    },
  },
];
