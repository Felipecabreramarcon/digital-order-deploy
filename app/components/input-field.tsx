import { cn } from "@/lib/utils";
import { Column } from "./column";
import { ErrorText } from "./error-text";

interface InputFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  labelClassName?: string;
  error?: string | string[];
}

export const InputField = ({
  className,
  labelClassName,
  error,
  ...props
}: InputFieldProps) => {
  return (
    <Column
      className={cn(
        "relative gap-2",
        className,
        error &&
          "mb-3 [&_*]:border-red-500   [&_*]:ring-red-500 [&_*]:focus:border-red-500 [&_*]:focus:ring-red-500 [&_*]:focus-visible:border-red-500/40 [&_input]:focus-visible:ring-red-500/40"
      )}
      {...props}
    >
      <label className={cn("text-xs", labelClassName)}>{props.label}</label>
      {props.children}
      <ErrorText>{error}</ErrorText>
    </Column>
  );
};
