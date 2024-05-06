import { ButtonHTMLAttributes, FC, ReactNode } from "react";
// import { ButtonLoader } from "../Loaders";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  _isSubmitting?: boolean;
}

const Button: FC<IButton> = ({
  variant,
  className,
  size = "md",
  children,
  _isSubmitting,
  ...rest
}) => {
  const variants: Record<string, unknown> = {
    primary: "bg-blue-500 w-[6rem] lg:w-[4.5rem] hover:bg-blue-400 font-extrabold py-[5px] text-black font-primary text-[1rem] lg:text-[14px] flex items-center justify-center rounded-[48px]",
    secondary: "border w-[6rem] lg:w-[4.5rem] border-grey-5 py-[5px] font-extrabold text-black font-primary text-[1rem] lg:text-[14px] h-[30px] lg:h-[24px] flex items-center justify-center rounded-[48px]",
    tertiary: "",
    destructive: "bg-red-500",
    inactive: "bg-gray-200 w-[6rem] lg:w-[4.5rem] font-extrabold text-black py-[5px]  text-black font-primary text-[1rem] lg:text-[14px] flex items-center justify-center rounded-[48px]",
  };

  // const sizes: Record<string, unknown> = {
  //   lg: "rounded-lg text-base px-6 py-3",
  //   md: "rounded-lg text-sm px-6 py-3",
  //   sm: "rounded-md text-sm px-3 py-1 text-sm ",
  // };

  return (
    <button
      className={`  ${className}  ${variants[variant]}`}
      {...rest}
    >
      {_isSubmitting ? "..." : children}
    </button>
  );
};

export default Button;
