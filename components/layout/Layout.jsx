import { useRouter } from "next/router";
import Header from "./Header";
import Footer from "./Footer";
import SubNav from "../nav/SubNav";
import Image from "next/image";
import background from "../../public/assets/img/background.png";

const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <div className="dark:bg-gray-800">
      <Header />
      {router.pathname === "/" ? (
        <Image
          alt="background"
          src={background}
          quality={100}
          width={785}
          height="auto"
          className="-mb-20 mx-auto pt-36 md:pt-10"
          priority
        />
      ) : null}
      <div id="sub-container" className="flex pt-36 container mx-auto md:pt-20">
        <SubNav />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
