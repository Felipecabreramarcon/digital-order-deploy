import { Column } from "@/app/components/column";
import { Row } from "@/app/components/row";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { CategoryModal } from "./create/modal";

export default async function CategoryPage() {
  const categories = await prisma.category.findMany();

  return (
    <Column className="w-full p-4">
      <Row className="justify-between mb-4">
        <h1 className="text-2xl font-semibold">Categorias</h1>
        <CategoryModal>
          <Button>
            <FaPlus>Novo</FaPlus>
          </Button>
        </CategoryModal>
      </Row>
    </Column>
  );
}
