import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Link } from "react-router-dom";
import Logout from "../Logout/Logout";

const Menu = () => {
  return (
    <div className="max-w-[55px] text-center">
      <Menubar className="bg-black text-white hover:cursor-pointer">
        <MenubarMenu>
          <MenubarTrigger className="bg-black text-white hover:cursor-pointer">
            Menu
          </MenubarTrigger>
          <MenubarContent className="bg-black text-white hover:cursor-pointer">
            <MenubarItem>
              <Link to="/chat">Chat Furia</Link>
            </MenubarItem>
            <MenubarItem>
              <Link to="/time">Info Time</Link>
            </MenubarItem>
            <MenubarItem>
              <Logout />
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default Menu;
