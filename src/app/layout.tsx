import type {Metadata} from "next";
import "./globals.css";
import {ReactQueryProvider} from "@/app/ReactQueryProvider";
import {Inter} from "next/font/google";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import {Slide, ToastContainer} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "MeuTreino",
    description: "",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <ReactQueryProvider>
            <AppRouterCacheProvider>
                <html lang="en" className={`h-full ${inter.className}`}>
                <body className={"h-full bg-zinc-900 text-zinc-100"}>
                {children}
                <ToastContainer
                    position="top-right"
                    autoClose={1500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    transition={Slide}
                />
                </body>
                </html>
            </AppRouterCacheProvider>
        </ReactQueryProvider>
    );
}
