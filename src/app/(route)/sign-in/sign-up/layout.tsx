export const metadata = {
  title: '회원가입',
  description: 'JMF 회원가입 페이지',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}