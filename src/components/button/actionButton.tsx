interface ActionButtonProps {
  children: React.ReactNode;
}

const ActionButton = ({ children }: ActionButtonProps) => {
  return (
    <button
      type={"submit"}
      className={"bg-red-600 w-96 h-16 rounded-lg font-bold"}
    >
      {children}
    </button>
  );
};

export default ActionButton;
