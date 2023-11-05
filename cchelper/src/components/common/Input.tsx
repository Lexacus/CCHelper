import { InputHTMLAttributes, forwardRef } from "react";
import { FieldError } from "react-hook-form";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: FieldError }
>(({ label, error, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-x-[5px] max-w-[300px]">
      {label && <span className="text-[18px]">{label}</span>}
      <input
        {...props}
        ref={ref}
        className="border-[1px] rounded-[4px] min-w-[200px] text-[18px]"
      />
      {error && <span className="text-[red]">{error?.message}</span>}
    </div>
  );
});
