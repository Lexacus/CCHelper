import { HTMLAttributes, forwardRef } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  HTMLAttributes<HTMLInputElement> & { label?: string }
>(({ label, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-x-[5px] max-w-[300px]">
      {label && <span>{label}</span>}
      <input {...props} ref={ref} className="border-[1px] rounded-[4px]" />
    </div>
  );
});
