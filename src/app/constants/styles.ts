export const BUTTON_STYLE = {
  reorder: (className: string) =>
    `w-32 h-12 bg-[#49AA19] rounded-2xl text-white shadow-lg ${className}`,
  default: () => 'w-full h-full',
} as const;

export const INPUT_STYLE = {
  search: (className: string) =>
    `w-96 h-8 bg-neutral-800 rounded-3xl px-8 outline-none ${className}`,
  default: (className: string) => `w-full h-full ${className}`,
} as const;
