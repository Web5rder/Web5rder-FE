export const BUTTON_STYLE = {
  reorder: (className: string) =>
    `w-32 h-12 bg-[#49AA19] rounded-2xl text-white shadow-lg ${className}`,
  dialog: (className: string) =>
    `flex-center p-2 gap-2 rounded-lg w-full whitespace-nowrap text-sm font-extrabold ${className}`,
  default: () => 'w-full h-full',
} as const;

export const INPUT_STYLE = {
  // 회원가입 input
  signin: (className: string) =>
    `w-full p-3 items-center rounded-xl border-2 bg-white text-gray-7 font-bold placeholder:text-gray-2 placeholder:font-normal ${className}`,
  search: (className: string) =>
    ` px-2 py-1 font-black placeholder:font-black focus:outline-none ${className}`,
  // 견적서 개수 입력
  count: (className: string) => `w-14 text-right ${className}`,
  default: (className: string) => `w-full h-full ${className}`,
} as const;
