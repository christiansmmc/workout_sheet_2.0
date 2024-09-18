interface ActionButtonProps {
    children: React.ReactNode;
}

const ActionButton = ({children}: ActionButtonProps) => {
    return (
        <button
            type={"submit"}
            className='bg-red-600 w-96 h-16 rounded-lg font-bold active:bg-red-700 lg:active:bg-red-600 lg:hover:bg-red-700'>
            {children}
        </button>
    );
};

export default ActionButton;
