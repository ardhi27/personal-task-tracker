import { twMerge } from "tailwind-merge";

interface BoxProps {
  className?: string;
  children: React.ReactNode;
}

const Box: React.FC<BoxProps> = ({ className, children }) => {
  return (
    <div className={twMerge(`w-[25rem] h-[30rem] rounded-md`, className)}>
      {children}
    </div>
  );
};

export default Box;
