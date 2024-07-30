import Image from "next/image";
import Link from "next/link";

interface NavLink {
  iconSrc: string;
  alt: string;
  label: string;
  href: string;
}
const navLinks: NavLink[] = [
  {
    iconSrc: "/assets/icons/home.svg",
    alt: "home",
    label: "Home",
    href: "/home",
  },
  {
    iconSrc: "/assets/icons/board.svg",
    alt: "boards",
    label: "Boards",
    href: "/boards",
  },
  {
    iconSrc: "/assets/icons/setting.svg",
    alt: "settings",
    label: "Settings",
    href: "/settings",
  },
  {
    iconSrc: "/assets/icons/teams.svg",
    alt: "teams",
    label: "Teams",
    href: "/teams",
  },
  {
    iconSrc: "/assets/icons/chart.svg",
    alt: "analytics",
    label: "Analytics",
    href: "/analytics",
  },
];

const NavMenu = () => {
  return (
    <nav className="h-full px-3 py-5 flex flex-col justify-between border border-[#dedede]">
      <div className="flex flex-col justify-start gap-2">
        <div className="flex justify-start items-center gap-2">
          <Image
            src={"/assets/images/user.png"}
            alt="user"
            width={31}
            height={31}
            className="rounded-lg"
          />
          <span className="font-medium text-xl text-[#080808]">
            Joe Gardner
          </span>
        </div>
        <div className="flex justify-between items-center ">
          <div className="flex justify-start items-center gap-5">
            <Image
              src={"/assets/icons/notification.svg"}
              alt="notification"
              width={24}
              height={24}
            />
            <Image
              src={"/assets/icons/sparkle.svg"}
              alt="sparkle"
              width={24}
              height={24}
            />
            <Image
              src={"/assets/icons/double-right-chevron.svg"}
              alt="double right chevron"
              width={24}
              height={24}
            />
          </div>
          <button className="rounded-md p-2 bg-[#f4f4f4] text-[#797979] text-base font-normal inline-flex justify-center items-center">
            Logout
          </button>
        </div>
        <ul className="flex flex-col gap-1">
          {navLinks.map((link) => {
            return (
              <Link
                href={link.href}
                key={link.label}
                className="p-2 flex justify-start items-center gap-2 bg-[#f4f4f4] border border-[#ddd] rounded"
              >
                <Image
                  src={link.iconSrc}
                  alt={link.alt}
                  width={24}
                  height={24}
                />
                <span className="font-normal text-xl text-[#797979]">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </ul>
        <button className="rounded-lg p-2 bg-create-task-linear-gradient inline-flex justify-center items-center gap-2 text-white text-xl font-medium">
          <span>Create new task</span>
          <Image
            src={"/assets/icons/plus.svg"}
            alt="create"
            width={24}
            height={24}
            className="text-create-task-linear-gradient"
          />
        </button>
      </div>
      <Link href={"/home"} className="p-2 rounded-lg bg-[#f3f3f3] flex justify-start items-center">
          <Image src={"/assets/icons/download.svg"} alt="download" width={40} height={40} />
          <div className="text-[#666] flex flex-col items-start justify-between">
            <span className="text-lg font-medium text-nowrap">Download the app</span>
            <span className="text-sm font-normal text-nowrap">Get the full experience</span>
          </div>
      </Link>
    </nav>
  );
};

export default NavMenu;
