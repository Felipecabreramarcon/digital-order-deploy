"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Row } from "@/app/components/row";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

type InputProps = React.ComponentProps<"input"> & {
  error?: string;
};

function Input({ className, type, error, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-gray-300 flex h-10 w-full min-w-0 rounded-md border bg-gray-100/50 px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[2px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
        error
          ? "border-red-500  ring-red-500 focus:border-red-500 focus:ring-red-500 focus-visible:border-red-500/40 focus-visible:ring-red-500/40"
          : ""
      )}
      {...props}
    />
  );
}

export { Input };

export const PasswordInput = (props: React.ComponentProps<"input">) => {
  const [show, setShow] = React.useState(false);

  return (
    <div className="relative w-full">
      <Input {...props} type={show ? "text" : "password"} />
      <Row className="absolute right-2 w-auto top-0 h-full items-center ">
        <Row
          onClick={() => setShow(!show)}
          className="justify-center rounded-full size-7 hover:bg-gray-300/50 cursor-pointer"
        >
          {show ? <IoIosEye /> : <IoIosEyeOff />}
        </Row>
      </Row>
    </div>
  );
};
