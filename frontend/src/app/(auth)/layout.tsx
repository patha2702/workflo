
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-b from-white to-[#AFA3FF] h-screen flex justify-center items-center">
        {children}
    </div>
  );
}
