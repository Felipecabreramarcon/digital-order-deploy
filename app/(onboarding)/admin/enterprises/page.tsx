import { Title } from "@/app/components/headers/title";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { FaPlus } from "react-icons/fa";
import EnterpriseTable from "./_components/enterpriseTable";
import { Row } from "@/app/components/row";
import { Column } from "@/app/components/column";
import { EnterpriseModal } from "./form/enterprise-modal";

export default async function EnterprisePage() {
  const enterprises = await prisma.enterprise.findMany();

  return (
    <Column className="p-4">
      <Row className="justify-between mb-4">
        <Title>Empresas</Title>
        <EnterpriseModal>
          <Button>
            <FaPlus />
            Novo
          </Button>
        </EnterpriseModal>
      </Row>
      <EnterpriseTable
        enterprises={enterprises.map((enterprise) => ({
          ...enterprise,
          cnpj: enterprise.cnpj || "--",
          email: enterprise.email || "--",
        }))}
      />
    </Column>
  );
}
