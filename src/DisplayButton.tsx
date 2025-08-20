import Button from "./Button";

const DisplayButton = (props: {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div>
      <span>{props.count}</span>
      <Button setCount={props.setCount} count={props.count} />
    </div>
  );
};

export default DisplayButton;
