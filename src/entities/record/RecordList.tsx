import React from "react";
import {
  Datagrid,
  List,
  TextField,
  DateField,
  ReferenceField,
  FunctionField,
  DeleteButton,
} from "react-admin";

export const RecordList: React.FC = (props) => {
  const item = localStorage.getItem("permissions");
  const permissions: string[] | undefined = item && JSON.parse(item);

  const admin = permissions?.includes("Admin");

  return (
    <List
      sort={{ field: "createdAt", order: "DESC" }}
      {...props}
      title="Список запросов на запись"
    >
      <Datagrid isRowSelectable={() => false}>
        <ReferenceField label="Пользователь" source="userId" reference="users">
          <TextField source="userName" />
        </ReferenceField>
        <ReferenceField
          label="Массажист"
          source="messeurId"
          reference="masseur"
        >
          <FunctionField
            render={(data: any) => `${data.firstName} ${data.lastName}`}
          />
        </ReferenceField>
        <ReferenceField
          label="Тип массажа"
          source="massageTypeId"
          reference="masseurtype"
        >
          <TextField source="name" />
        </ReferenceField>
        <DateField source="createdAt" label="Дата создания" />
        <FunctionField
          label="Дата записи"
          render={(data: any) => {
            const date = new Date(data.date);

            return date.toLocaleString("ru-RU");
          }}
        />
        {admin && <DeleteButton />}
      </Datagrid>
    </List>
  );
};
