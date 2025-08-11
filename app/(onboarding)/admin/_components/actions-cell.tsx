import { Row } from "@/app/components/row";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { JSX } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";

interface ActionsMenu<T> {
  toEditValues: T;
  FormModal: JSX.ElementType;
}

export const ActionsMenu = <T,>({
  FormModal,
  toEditValues,
}: ActionsMenu<T>) => {
  return (
    <Row className="gap-2 ">
      <DropdownMenu>
        <DropdownMenuTrigger className="p-2 rounded-full">
          <HiDotsVertical className="size-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          alignOffset={-20}
          sideOffset={-10}
          className="text-muted-foreground"
        >
          <DropdownMenuItem onClick={(e) => e.preventDefault()}>
            <FormModal toEdit={toEditValues}>
              <Row className="gap-2">
                <FaPen />
                Editar
              </Row>
            </FormModal>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Row className="gap-2">
              <FaTrash />
              Deletar
            </Row>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Row>
  );
};
