import React from "react";
import { FC } from "react";
import {
  Edit,
  required,
  number,
  SimpleForm,
  TextInput,
  NumberInput,
  ImageInput,
  ImageField,
} from "react-admin";

export const MassagueTypeEdit: React.FC = (props) => (
  <Edit {...props} title="Редактирование вида массажа">
    <SimpleForm>
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
      <ImageInput source="file" label="Картинка" multiple={false}>
        <PreviewImage source="src" />
      </ImageInput>
    </SimpleForm>
  </Edit>
);
const PreviewImage: FC<any> = ({ record, source }) => {
  if (typeof record == "string") {
    record = {
      [source]: record,
    };
  }
  return <ImageField record={record} source={source} />;
};
