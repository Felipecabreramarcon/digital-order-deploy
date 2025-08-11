"use client";

import { GenericTable } from "@/app/components/generic-table";
import { Row } from "@/app/components/row";
import { getNameInitials } from "@/app/helpers/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import { EnterpriseModal } from "../form/enterprise-modal";
import { ActionsMenu } from "../../_components/actions-cell";

export default function EnterpriseTable({
  enterprises,
}: {
  enterprises: Enterprise[];
}) {
  return <GenericTable columns={columns} data={enterprises} />;
}

export type Enterprise = {
  id: number;
  email: string;
  avatar: string | null;
  name: string;
  cnpj: string;
  createdAt: Date;
};

export const columns: ColumnDef<Enterprise>[] = [
  {
    accessorKey: "avatar",
    header: "Avatar",
    cell: ({ row }) => {
      const image = row.getValue("avatar") as string;
      const name = row.getValue("name") as string;
      return (
        <Avatar>
          <AvatarImage src={image} />
          <AvatarFallback className="bg-gray-200">
            {getNameInitials(name)}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "cnpj",
    header: "CNPJ",
  },
  {
    accessorKey: "email",
    header: "E-mail",
  },
  {
    accessorKey: "createdAt",
    header: "Data de Criação",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return date.toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const vals = row.original;
      return <ActionsMenu toEditValues={vals} FormModal={EnterpriseModal} />;
    },
  },
];
