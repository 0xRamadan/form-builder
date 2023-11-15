import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { UserButton } from "@clerk/nextjs";

const NavBar = () => {
  return (
    <nav className="flex justify-between border-b border-border h-[60px] px-4 py-2">
      <Logo />
      <div className="flex gap-4 items-center">
        <ThemeSwitcher />
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </nav>
  );
};

export default NavBar;
