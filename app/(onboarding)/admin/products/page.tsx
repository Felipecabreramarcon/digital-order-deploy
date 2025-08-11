import { prisma } from "@/lib/prisma";
import { Title } from "@/app/components/headers/title";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import ProductTable from "./components/productTable";
import { Column } from "@/app/components/column";
import { Row } from "@/app/components/row";
import { ProductModal } from "./create/modal";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
  });

  const productsWithNumberPrice = products.map((product) => ({
    ...product,
    price:
      typeof product.price === "object" && "toNumber" in product.price
        ? product.price.toNumber()
        : product.price,
  }));

  return (
    <Column className="p-4">
      <Row className="justify-between mb-4">
        <Title>Produtos</Title>
        <ProductModal>
          <Button variant="default">
            <FaPlus />
            Novo
          </Button>
        </ProductModal>
      </Row>
      <div className="shadow-md rounded-lg">
        <ProductTable products={productsWithNumberPrice} />
      </div>
    </Column>
  );
}
