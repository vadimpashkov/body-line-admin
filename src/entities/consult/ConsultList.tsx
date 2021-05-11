import React from "react";
import {
  Datagrid,
  List,
  TextField,
  DateField,
  DeleteButton,
} from "react-admin";

export const ConsultList: React.FC = (props) => {
  return (
    <List
      sort={{ field: "dateCreation", order: "DESC" }}
      {...props}
      title="Список запросов на консультацию"
    >
      <Datagrid isRowSelectable={() => false}>
        <TextField source="phone" label="Телефон" />
        <DateField source="dateCreation" label="Дата создания" />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};
