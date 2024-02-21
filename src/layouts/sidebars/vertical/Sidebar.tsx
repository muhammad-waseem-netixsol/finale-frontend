import { Button, Nav, NavItem } from "reactstrap";
import Logo from "../../logo/Logo";
import Link from "next/link";
import { useRouter } from "next/router";
import useLogin from "../../../../zustand-store/loginStore/Login";
import { useEffect } from "react";

interface NavigationItem {
  title: string;
  href: string;
  icon: string;
}

const navigation: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: "bi bi-speedometer2",
  },
  {
    title: "News",
    href: "/list/NewsList",
    icon: "bi bi-bell",
  },
  // Add more navigation items as needed
];

const Sidebar: React.FC<{ showMobilemenu: () => void }> = ({ showMobilemenu }) => {
  const curl = useRouter();
  const location = curl.pathname;
  const { logout, success } = useLogin();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loginState") || "");
    console.log(user.state.success);
    if (user.state.success === false) {
      curl.push("/auth/login");
    }
  }, [success, logout]);

  const onLogOut = () => {
    logout();
  };

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={showMobilemenu}
        ></Button>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link href={navi.href}>
                <span
                  className={
                    location === navi.href
                      ? "text-primary nav-link py-3"
                      : "nav-link text-secondary py-3"
                  }
                >
                  <span className={navi.icon}></span>
                  <span className="ms-3 d-inline-block">{navi.title}</span>
                </span>
              </Link>
            </NavItem>
          ))}
          <Button
            color="secondary"
            tag="a"
            target="_blank"
            className="mt-3"
            onClick={onLogOut}
          >
            LogOut
          </Button>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
