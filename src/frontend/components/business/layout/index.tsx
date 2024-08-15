import Navbar from "./Navbar";
import Footer from "./Footer";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import LoadingProvider from "./LoadingProvider";
import { Toaster } from "../../ui/toaster";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <LoadingProvider>
        <div className="flex justify-center min-h-screen">
          <div className="max-w-[1920px] w-full px-5 xl:px-[80px] 2xl:px-[122px] relative">
            <Navbar />
            <main>{children}</main>
            <Toaster />
            <Footer />
          </div>
        </div>
      </LoadingProvider>
    </UserProvider>
  );
};

export default Layout;
