import { InputHTMLAttributes, forwardRef } from "react";
import { FieldError } from "react-hook-form";
import { cn } from "../../utils";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: FieldError }
>(({ label, error, ...props }, ref) => {
  return (
    <div className="flex flex-col items-center gap-x-[5px] w-fit min-w-[50%]">
      <div className="flex flex-row gap-x-[5px] w-full">
        {label && (
          <span className="text-[18px] font-medium flex-[1] whitespace-nowrap">
            {label}
          </span>
        )}
        <input
          {...props}
          ref={ref}
          className={cn(
            "border rounded-[4px] min-w-[200px] w-fit text-[18px] flex-[1] outline-none",
            !error ? "" : "border-red"
          )}
        />
      </div>
      {error && <span className="text-[red]">{error?.message}</span>}
    </div>
  );
});
