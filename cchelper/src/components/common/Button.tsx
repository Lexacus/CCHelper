import { ButtonHTMLAttributes, FC } from "react";

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className="bg-blue-800 text-white rounded-[4px] px-[8px] text-[18px] w-fit"
    >
      {children}
    </button>
  );
};
