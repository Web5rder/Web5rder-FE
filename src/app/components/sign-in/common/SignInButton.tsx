interface SingInButtonProps {
  onClick: () => void;
  type: 'button' | 'submit' | 'reset';
  isActive?: boolean;
  bgColor: string;
  subColor?: string;
  text: string;
}

function SignInButton({
  onClick,
  type,
  isActive,
  bgColor,
  subColor,
  text,
}: SingInButtonProps) {
  return (
    <button
      onClick={onClick}
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={`${isActive ? bgColor : subColor} w-full mt-1 rounded-xl py-3`}
    >
      <p className="text-white text-xl font-black">{text}</p>
    </button>
  );
}

SignInButton.defaultProps = {
  isActive: true,
  subColor: '',
};

export default SignInButton;
