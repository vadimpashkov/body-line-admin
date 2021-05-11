import React, { FC } from "react";
import {
  Create,
  required,
  SimpleForm,
  TextInput,
  ImageInput,
  NumberInput,
  ImageField,
  number,
} from "react-admin";

export const MassagueTypeCreate: React.FC = (props) => (
  <Create {...props} title="Добавление вида массажа">
    <SimpleForm redirect="list">
      <TextInput
        validate={required()}
        source="name"
        fullWidth
        helperText="Название"
        label="Название"
      />
      {/* <TextInput
        validate={[required(), number()]}
        source='price'
        fullWidth
        helperText='Цена'
        label='Цена'
      /> */}
      <TextInput
        validate={required()}
        source="description"
        fullWidth
        multiline
        helperText="Описание"
        label="Описание"
      />
      <ImageInput
        source="file"
        label="Картинка"
        multiple={false}
        validate={required()}
      >
        <PreviewImage source="src" />
      </ImageInput>
    </SimpleForm>
  </Create>
);
const PreviewImage: FC<any> = ({ record, source }) => {
  if (typeof record == "string") {
    record = {
      [source]: record,
    };
  }
  return <ImageField record={record} source={source} />;
};
