import { Link } from "react-router-dom";
import Logo from "../../assets/Logo";
import { useAppStore } from "../../store/store";

export default function Header() {
  const { userInfo } = useAppStore();
  const isAuth = !!userInfo;

  return (
    <>
      <div className="sticky top-0 w-full z-100 bg-white/50 h-16 cursor-pointer">
        <div className="px-4 w-full backdrop-blur-lg flex justify-between py-4">
          <img
            className="size-8"
            src="https://scontent-fra3-2.xx.fbcdn.net/v/t39.8562-6/475210330_598195142840489_9172482348551739153_n.png?_nc_cat=1&ccb=1-7&_nc_sid=f537c7&_nc_ohc=nYmE1rRsBqMQ7kNvgFiCAI8&_nc_oc=Adlu-ApbfbLuVEYcgL9BG9ZP7ik0_CvP8uZGjSYzxtjxFZjPrRb3l-qDM5RI7eG0NUA&_nc_zt=14&_nc_ht=scontent-fra3-2.xx&_nc_gid=lgJdM3HgJVQOUpwVFqMMLw&oh=00_AYGnxtueZbmXkayaAOkoojEhZbtqGAXQCMDqhKj847GQzA&oe=67EEECD8"
          />
          <nav className="flex justify-end">
            <ul className="flex flex-row-reverse gap-4 relative">
              <li className="text-blue-600 tracking-wider text-xl hover:transition hover:-translate-y-0.5 hover:text-blue-700 hover:duration-200 hover:ease-in-out">
                <Link to="/">Home</Link>
              </li>
              <li className="text-blue-600 text-xl hover:transition hover:-translate-y-0.5 hover:text-blue-700 hover:duration-200 hover:ease-in-out">
                <Link to="/chat">Chats</Link>
              </li>
              {isAuth && (
                <li className="text-blue-600 text-xl hover:transition hover:-translate-y-0.5 hover:text-blue-700 hover:duration-200 hover:ease-in-out">
                  <Link to="/profile">Profile</Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
