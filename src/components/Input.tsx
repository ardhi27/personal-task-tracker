import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const InputForm: React.FC<InputProps> = ({ className, ...rest }) => {
  return (
    <input
      className={twMerge(
        `rounded-md bg-black text-white focus:ring-white`,
        className
      )}
      {...rest}
    ></input>
  );
};

export default InputForm;
