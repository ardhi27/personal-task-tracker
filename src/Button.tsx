const Button = (props: {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <button
      className="bg-black"
      onClick={() => {
        props.setCount(props.count + 1);
      }}
    >
      Test Click
    </button>
  );
};

export default Button;
