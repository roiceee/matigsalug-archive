import { ReactNode } from "react";
import Navbar from "../components/Navbar";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <section className=" min-h-screen bg-slate-100">
      <Navbar />
      <section className="mt-6 max-w-screen-xl mx-auto px-2">
        {children}
      </section>
      <footer></footer>
    </section>
  );
}
