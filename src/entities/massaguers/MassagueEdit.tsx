import React from "react";
import { FC } from "react";
import {
  Edit,
  required,
  SimpleForm,
  TextInput,
  ImageInput,
  ImageField,
} from "react-admin";

export const MassagueEdit: React.FC = (props) => (
  <Edit {...props} title="Редактирование массажиста">
    <SimpleForm>
      <TextInput
        validate={required()}
        source="firstName"
        fullWidth
        helperText="Имя"
        label="Имя"
      />
      <TextInput
        validate={required()}
        source="lastName"
        fullWidth
        helperText="Фамилия"
        label="Фамилия"
      />
      <TextInput
        validate={required()}
        source="occupation"
        fullWidth
        helperText="Введите род деятельности"
        label="Род деятельности"
      />
      <TextInput
        validate={required()}
        source="description"
        fullWidth
        helperText="Введите краткое описание"
        label="О мастере"
        multiline
      />
      <ImageInput source="file" label="Фото" multiple={false}>
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
