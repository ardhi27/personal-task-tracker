import { twMerge } from "tailwind-merge";

interface GroupProps {
  className?: string;
  children: React.ReactNode;
}

const Group: React.FC<GroupProps> = ({ className, children }) => {
  return <div className={twMerge(`flex`, className)}>{children}</div>;
};

export default Group;
