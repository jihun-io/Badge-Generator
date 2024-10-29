import "./globals.css";

export const metadata = {
  title: "배지 생성기",
  description: "기술 스택 배지를 간단하게 만들어 보세요!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body
        className={`antialiased min-h-[100dvh] break-keep grid grid-rows-[auto,1fr,auto]`}
      >
        {children}
      </body>
    </html>
  );
}
