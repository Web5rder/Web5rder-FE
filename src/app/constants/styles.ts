export const BUTTON_STYLE = {
  reorder: (className: string) =>
    `w-32 h-12 bg-[#49AA19] rounded-2xl text-white shadow-lg ${className}`,
  default: () => 'w-full h-full',
} as const;

export const INPUT_STYLE = {
  search: (className: string) =>
    `md:w-96 px-2 py-1 text-xl font-black placeholder:text-xl placeholder:font-black focus:outline-none ${className}`,
  // 견적서 개수 입력
  count: (className: string) => `w-14 text-right ${className}`,
  default: (className: string) => `w-full h-full ${className}`,
} as const;
