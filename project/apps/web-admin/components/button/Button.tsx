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
  isLoading?: boolean;
}

export function Button({
  className,
  children,
  type = "button",
  variant = "primary",
  isLoading,
  ...buttonProps
}: CustomButtonProps) {
  const handleButtonStyle = {
    primary: "bg-tone-1 text-(--color-text) hover:bg-tone-2 ",
    secondary: "bg-tone-4 text-(--color-text) hover:bg-tone-3",
    tertiary: "bg-tone-5 text-(--color-text) hover:bg-tone-4",
    danger: "bg-red-700 text-(--color-text) hover:bg-red-500",
    warning: "bg-yellow-600 text-(--color-text) hover:bg-yellow-500",
    info: "bg-blue-600 text-(--color-text) hover:bg-blue-500",
    success: "bg-green-600 text-(--color-text) hover:bg-green-500",
  };

  return (
    <button
      className={cl(
        handleButtonStyle[variant],
        "disabled:opacity-60 w-fit rounded-md py-2 px-4 shadow-sm",
        className,
      )}
      type={type}
      disabled={isLoading}
      {...buttonProps}
    >
      {isLoading ? "Carregando..." : children}
    </button>
  );
}
