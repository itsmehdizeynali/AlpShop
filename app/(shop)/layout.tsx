import LayoutHeader from "@/components/layout/header";
import LayoutToolbar from "@/components/layout/toolbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LayoutToolbar/>
      <LayoutHeader/>
      {children}
      <footer className="pb-20">

      </footer>
    </>
  );
}
