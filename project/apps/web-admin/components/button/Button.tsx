import { cl } from "@repo/utils";
import React from "react";

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "danger"
    | "warning"
    | "info"
    | "success";
}

export function Button({
  className,
  children,
  type = "button",
  variant = "primary",
  ...buttonProps
}: CustomButtonProps) {
  const handleButtonStyle = {
    primary:
      "w-fit rounded-md bg-tone-1 py-2 px-4 text-(--color-text) shadow-sm hover:bg-tone-2",
    secondary:
      "w-fit rounded-md bg-tone-4 py-2 px-4 text-(--color-text) shadow-sm hover:bg-tone-3",
    tertiary:
      "w-fit rounded-md bg-tone-5 py-2 px-4 text-(--color-text) shadow-sm hover:bg-tone-4",
    danger:
      "w-fit rounded-md bg-red-700 py-2 px-4 text-(--color-text) shadow-sm hover:bg-red-500",
    warning:
      "w-fit rounded-md bg-yellow-600 py-2 px-4 text-(--color-text) shadow-sm hover:bg-yellow-500",
    info: "w-fit rounded-md bg-blue-600 py-2 px-4 text-(--color-text) shadow-sm hover:bg-blue-500",
    success:
      "w-fit rounded-md bg-green-600 py-2 px-4 text-(--color-text) shadow-sm hover:bg-green-500",
  };

  return (
    <button
      className={cl(handleButtonStyle[variant], className)}
      type={type}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
