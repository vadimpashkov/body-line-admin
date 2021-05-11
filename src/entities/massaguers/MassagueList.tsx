import React from "react";
import {
  Datagrid,
  List,
  TextField,
  FunctionField,
  DeleteButton,
} from "react-admin";

export const MassagueList: React.FC = (props) => {
  return (
    <List {...props} title="Список массажистов">
      <Datagrid rowClick="edit" isRowSelectable={() => false}>
        <TextField source="userName" label="Имя пользователя" />
        <FunctionField
          render={(data: any) => (
            <img
              className="img"
              src={`/api/v1/imgs/${data.src}`}
              alt={data.alt}
            />
          )}
        />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};
