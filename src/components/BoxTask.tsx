import { twMerge } from "tailwind-merge";

interface BoxProps {
  className?: string;
  children: React.ReactNode;
}

const Box: React.FC<BoxProps> = ({ className, children }) => {
  return (
    <div className={twMerge(`w-[20rem] h-[20rem]`, className)}>{children}</div>
  );
};

export default Box;
