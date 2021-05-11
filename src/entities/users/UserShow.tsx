import React from "react";
import {
  SimpleShowLayout,
  Show,
  TextField,
  FunctionField,
  DateField,
} from "react-admin";

export const UserShow: React.FC = (props) => {
  return (
    <Show {...props} title="Данные пользователя">
      <SimpleShowLayout>
        <TextField label="Логин" source="userName" />
        <TextField label="Имя" source="firstName" />
        <TextField label="Фамилия" source="lastName" />
        <DateField label="Дата регистрации" source="registrationDate" />
        {/* <FunctionField
          label='Картинка'
          render={(data: any) => (
            <img width={200} src={`/api/v1/imgs/${data.src}`} alt={data.alt} />
          )}
        /> */}
      </SimpleShowLayout>
    </Show>
  );
};
