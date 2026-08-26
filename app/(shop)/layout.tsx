import LayoutHeader from "@/components/layout/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LayoutHeader/>
      {children}
    </>
  );
}
