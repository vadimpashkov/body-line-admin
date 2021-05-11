import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery, Box } from "@material-ui/core";
import PhotoLibrary from "@material-ui/icons/PhotoLibrary";
import ViewCarousel from "@material-ui/icons/ViewCarousel";
import Forum from "@material-ui/icons/Forum";
import PermPhoneMsg from "@material-ui/icons/PermPhoneMsg";
import PeopleAlt from "@material-ui/icons/PeopleAlt";
import Work from "@material-ui/icons/Work";
import { useTranslate, MenuItemLink } from "react-admin";
import SubMenu from "./SubMenu";

const Menu: React.FC<any> = ({ onMenuClick, logout, dense = false }) => {
  const [state, setState] = useState<{ [p: string]: boolean }>({
    diseas: true,
  });
  const isXSmall = useMediaQuery((theme: any) => theme.breakpoints.down("xs"));
  const open = useSelector((state: any) => state.admin.ui.sidebarOpen);
  useSelector((state: any) => state.theme); // force rerender on theme change

  const handleToggle = (menu: string) => {
    setState((state) => ({ ...state, [menu]: !state[menu] }));
  };

  const item = localStorage.getItem("permissions");
  const permissions: string[] | undefined = item && JSON.parse(item);

  const admin = permissions?.includes("Admin");

  return (
    <Box mt={1}>
      <MenuItemLink
        to={`/records`}
        primaryText={"Записи"}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
        leftIcon={<PermPhoneMsg />}
      />
      {admin && (
        <>
          <MenuItemLink
            to={`/imgs`}
            primaryText={"Фотографии салона"}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
            leftIcon={<PhotoLibrary />}
          />
          <MenuItemLink
            to={`/users`}
            primaryText={"Пользователи"}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
            leftIcon={<PeopleAlt />}
          />
          <MenuItemLink
            to={`/masseur`}
            primaryText={"Массажисты"}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
            leftIcon={<Work />}
          />
          <MenuItemLink
            to={`/masseurtype`}
            primaryText={"Виды массажа"}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
            leftIcon={<ViewCarousel />}
          />
          <MenuItemLink
            to={`/consult`}
            primaryText={"Консультации"}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
            leftIcon={<Forum />}
          />
        </>
      )}
      {isXSmall && logout}
    </Box>
  );
};

export default Menu;
