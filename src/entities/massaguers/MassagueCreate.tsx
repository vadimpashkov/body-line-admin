import React from "react";
import { FC } from "react";
import {
  Create,
  required,
  SimpleForm,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
  ImageInput,
  ImageField,
} from "react-admin";

export const MassagueCreate: React.FC = (props) => (
  <Create {...props} title="Добавление массажиста">
    <SimpleForm redirect="list">
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
      <ReferenceInput
        label="Пользователь"
        source="userId"
        reference="users"
        validate={required()}
      >
        <AutocompleteInput optionText="userName" />
      </ReferenceInput>
      <ImageInput
        source="file"
        label="Фото"
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
