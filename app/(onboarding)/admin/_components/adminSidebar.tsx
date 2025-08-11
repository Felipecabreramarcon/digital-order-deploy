"use client";
import { Column } from "@/app/components/column";
import { Row } from "@/app/components/row";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { User } from "next-auth";
import { redirect, usePathname } from "next/navigation";
import { FaTag, FaUsers } from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";
import { IoStorefrontSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "next-auth/react";
import { getNameInitials } from "@/app/helpers/utils";
import { BsCart4 } from "react-icons/bs";

export const AdminSidebar = ({ user }: { user: User | undefined }) => {
  const items = [
    { title: "Usuarios", path: "users", Icon: <FaUsers /> },
    { title: "Empresas", path: "enterprises", Icon: <IoStorefrontSharp /> },
    { title: "Produtos", path: "products", Icon: <BsCart4 /> },
    { title: "Categorias", path: "categorys", Icon: <FaTag /> }
  ];

  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Row className="p-1 justify-center gap-2">
          <GiKnifeFork className="size-6" />
          <h1 className="text-lg font-semibold">Digital Order</h1>
        </Row>
        <Separator />
        <h1 className="text-lg font-semibold">Admin</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="gap-2">
          {items.map(({ Icon, path, title }, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton
                className={
                  pathname.includes(path)
                    ? "bg-blue-500 hover:bg-blue-600 text-white hover:text-white"
                    : " "
                }
                onClick={() => redirect(`/admin/${path}`)}
              >
                {Icon} <span>{title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="mb-4">
        <UserMenu user={user} />
      </SidebarFooter>
    </Sidebar>
  );
};

const UserMenu = ({ user }: { user: User | undefined }) => {
  const nameInitials = getNameInitials(user?.name || "");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Row className="justify-between gap-4 p-2">
          <Avatar>
            <AvatarImage src={user?.image || ""}></AvatarImage>
            <AvatarFallback>{nameInitials}</AvatarFallback>
          </Avatar>
          <Column className="items-start text-sm leading-5">
            <b>{user?.name}</b>
            <p>{user?.email}</p>
          </Column>
        </Row>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
        <DropdownMenuItem onClick={() => signOut()} className="text-gray-700">
          <FiLogOut />
          <p>Logout</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
