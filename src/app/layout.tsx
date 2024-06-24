import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ReduxProvider from "../Redux/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        {
          <ReduxProvider>

            {props.children}
          </ReduxProvider>
        }
      </body>
    </html>
  );
}
