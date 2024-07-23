import { SignInputProps } from '@/app/_types/sign-in';
import Input from '../../common/Input';

function SignInInput({
  label,
  placeholder,
  type = 'text',
  value = '',
  onChange = () => {},
  error,
  errorMessage,
}: SignInputProps) {
  return (
    <div className="w-full flex-col pb-2">
      <p className="text-gray-9 font-semibold pl-3 pb-[6px]">{label}</p>
      <Input
        value={value}
        className={`w-full p-3 items-center rounded-xl border-2 ${error ? 'border-red-1' : 'border-gray-3'} bg-white text-gray-7 font-bold placeholder:text-gray-2 placeholder:font-normal`}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
      />
      {error && (
        <p className="absolute text-red-1 pt-1 pl-3 text-[8px] sm:text-xs lg:text-base">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default SignInInput;
