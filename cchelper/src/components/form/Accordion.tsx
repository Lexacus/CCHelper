import { FC, HTMLAttributes, useState } from "react";
import { cn } from "../../utils";

export const Accordion: FC<
  HTMLAttributes<HTMLDivElement> & { title: string }
> = ({ children, title, ...props }) => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <div
      {...props}
      className={cn(
        "flex flex-col gap-x-[5px] border-black gap-y-[5px]",
        open ? "" : "border-b"
      )}
    >
      <div
        className="flex flex-row justify-between cursor-pointer "
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <span className="text-[18px] font-medium">{title}</span>
        <span className="text-[18px] font-medium">
          {open ? "Chiudi" : "Apri"}
        </span>
      </div>
      {open && (
        <div className="flex flex-col border border-black py-[5px] px-[5px] w-full">
          {children}
        </div>
      )}
    </div>
  );
};
