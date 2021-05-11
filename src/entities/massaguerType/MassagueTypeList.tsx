import React from "react";
import {
  Datagrid,
  List,
  TextField,
  FunctionField,
  DeleteButton,
} from "react-admin";

export const MassagueTypeList: React.FC = (props) => {
  return (
    <List {...props} title="Список видов массажа">
      <Datagrid rowClick="edit" isRowSelectable={() => false}>
        <TextField source="name" label="Название" />
        <FunctionField
          render={(data: any) => (
            <img
              className="img"
              src={`/api/v1/imgs/${data.image}`}
              alt={data.alt}
            />
          )}
        />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};
