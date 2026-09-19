import { cl } from "@repo/utils";
import React from "react";

export default function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cl(
        "min-h-11 rounded-lg border border-(--sidebar-border) bg-(--color-content) px-3 text-sm text-(--foreground) outline-none focus:border-tone-1 focus:shadow-[0_0_0_3px_rgba(143,33,237,.15)]",
        className,
      )}
    />
  );
}
