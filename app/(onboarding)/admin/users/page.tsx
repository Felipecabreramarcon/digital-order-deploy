import { Column } from "@/app/components/column";
import { Title } from "@/app/components/headers/title";
import { Row } from "@/app/components/row";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { FaPlus } from "react-icons/fa";
import UsersTable from "./_components/usersTable";
import { RoleLabels } from "./type";
import { UserModal } from "./form/user-modal";
import { User } from "@/src/generated/prisma";
export interface FormatedUser extends User {
  roleLabel: RoleLabels;
}
export default async function UsersPage() {
  const users = await prisma.user.findMany();

  return (
    <Column className="p-4">
      <Row className="justify-between mb-4">
        <Title>Usuarios</Title>
        <UserModal>
          <Button>
            Novo <FaPlus />
          </Button>
        </UserModal>
      </Row>
      <div className="shadow-md rounded-lg">
        <UsersTable
          users={users?.map((user) => ({
            ...user,
            roleLabel: RoleLabels[user.role as keyof typeof RoleLabels],
          }))}
        />
      </div>
    </Column>
  );
}
