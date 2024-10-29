import "./globals.css";
import { generateMetadata } from "../../utils/metadata";

export const metadata = generateMetadata();

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
