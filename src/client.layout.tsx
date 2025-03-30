// app/client-layout.tsx - Client Component
"use client";

import { Provider } from "react-redux";
import store from "@/Redux/App/store";
import { Toaster } from "react-hot-toast";

export default function ClientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Provider store={store}>
      <main className="flex-1">{children}</main>
      <Toaster position="top-center" reverseOrder={false} />
    </Provider>
  );
}