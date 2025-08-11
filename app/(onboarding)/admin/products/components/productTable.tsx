"use client";

import { GenericTable } from "@/app/components/generic-table";
import { Row } from "@/app/components/row";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";

export default function ProductTable({ products }: { products: Product[] }) {
  return <GenericTable columns={columns} data={products} />;
}

type Product = {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  image?: string | null;
  stock: number;
  category: Category;
  createdAt: Date;
};

interface Category {
  id: number;
  name: string;
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "image",
    header: "Imagem",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "price",
    header: "Preço",
    cell: ({ row }) => {
      const price = row.original.price;
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price);
    },
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row }) => {
      const category = row.original.category;
      return category ? category.name : "Sem categoria";
    },
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
    cell: ({ row }) => (
      <Row className="gap-2 justify-center">
        <Button variant="default" className="flex items-center">
          <FaPen />
        </Button>
        <Button variant="destructive" className="flex items-center">
          <FaTrash />
        </Button>
        <Button variant="outline" className="flex items-center">
          <FaEye />
        </Button>
      </Row>
    ),
  },
];
