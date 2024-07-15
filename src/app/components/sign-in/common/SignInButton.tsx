interface SingInButtonProps {
  onClick: () => void;
  type: 'button' | 'submit' | 'reset';
  text: string;
}

function SignInButton({ onClick, type, text }: SingInButtonProps) {
  return (
    <button
      onClick={onClick}
      // eslint-disable-next-line react/button-has-type
      type={type}
      className="bg-primary-1 w-full mt-4 rounded-xl py-3"
    >
      <p className="text-white text-xl font-black">{text}</p>
    </button>
  );
}

export default SignInButton;
