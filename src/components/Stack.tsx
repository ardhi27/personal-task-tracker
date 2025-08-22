import { twMerge } from "tailwind-merge";

interface StackProps {
  className?: string;
  children: React.ReactNode;
}

const Stack: React.FC<StackProps> = ({ className, children }) => {
  return <div className={twMerge(`flex flex-col`, className)}>{children}</div>;
};

export default Stack;
