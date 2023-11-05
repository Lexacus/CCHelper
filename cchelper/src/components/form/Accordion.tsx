import { FC, HTMLAttributes, useState } from "react";

export const Accordion: FC<
  HTMLAttributes<HTMLDivElement> & { title: string }
> = ({ children, title, ...props }) => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <div
      {...props}
      className="flex flex-col gap-x-[5px] border border-black p-[5px] gap-y-[5px] "
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
      {open && children}
    </div>
  );
};
