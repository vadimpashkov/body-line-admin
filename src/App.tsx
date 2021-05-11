import React from "react";
import { Admin, Resource, Login } from "react-admin";
import PostIcon from "@material-ui/icons/Book";
import polyglotI18nProvider from "ra-i18n-polyglot";

import { dataProvider } from "./configuration";

import authProvider from "./authProvider";
import LoginForm from "./pages/LoginForm";

import "./App.css";
import { theme } from "./static/theme";

import { PictureCreate, PictureList } from "./entities/pictures";
import { UserList, UserShow } from "./entities/users";
import { RecordList } from "./entities/record";
import { ConsultList } from "./entities/consult";
import {
  MassagueTypeCreate,
  MassagueTypeEdit,
  MassagueTypeList,
} from "./entities/massaguerType";
import {
  MassagueList,
  MassagueCreate,
  MassagueEdit,
} from "./entities/massaguers";
import { Menu } from "./Layout";

const russianMessages = require("ra-language-russian");

const i18nProvider = polyglotI18nProvider(() => russianMessages, "ru");

const LoginPage = (props: any) => {
  return (
    <Login {...props}>
      <React.Fragment>
        <LoginForm {...props} />
      </React.Fragment>
    </Login>
  );
};

export default function App() {
  return (
    <Admin
      theme={theme}
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
      authProvider={authProvider}
      loginPage={LoginPage}
      menu={Menu}
    >
      <Resource
        name="records"
        list={RecordList}
        icon={PostIcon}
        options={{
          label: "Записи",
        }}
      />
      <Resource
        name="imgs"
        list={PictureList}
        create={PictureCreate}
        icon={PostIcon}
        options={{
          label: "Фотографии салона",
        }}
      />
      <Resource
        name="users"
        list={UserList}
        show={UserShow}
        icon={PostIcon}
        options={{
          label: "Пользователи",
        }}
      />
      <Resource
        name="masseur"
        list={MassagueList}
        create={MassagueCreate}
        edit={MassagueEdit}
        icon={PostIcon}
        options={{
          label: "Массажисты",
        }}
      />
      <Resource
        name="masseurtype"
        list={MassagueTypeList}
        create={MassagueTypeCreate}
        edit={MassagueTypeEdit}
        icon={PostIcon}
        options={{
          label: "Виды массажа",
        }}
      />
      <Resource
        name="consult"
        list={ConsultList}
        icon={PostIcon}
        options={{
          label: "Консультации",
        }}
      />
    </Admin>
  );
}
