import NavMenu from "@/components/NavMenu";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen max-h-screen w-screen flex">
      <div className="w-72 h-full">
        <NavMenu />
      </div>
      <div className="w-full h-full px-3 py-5 bg-[#f7f7f7] border border-black">{children}</div>
    </div>
  );
};

export default DashboardLayout;
