import React from "react";
import {
  Datagrid,
  List,
  TextField,
  FunctionField,
  DateField,
} from "react-admin";

export const UserList: React.FC = (props) => {
  return (
    <List
      {...props}
      title="Список пользователей"
      sort={{ field: "registrationDate", order: "DESC" }}
    >
      <Datagrid rowClick="show" isRowSelectable={() => false}>
        <TextField label="Имя пользователя" source="firstName" />
        <DateField label="Дата регистрации" source="registrationDate" />
        {/* <FunctionField
          render={(data: any) => (
            <img width={200} src={`/api/v1/imgs/${data.src}`} alt={data.alt} />
          )}
        /> */}
      </Datagrid>
    </List>
  );
};
