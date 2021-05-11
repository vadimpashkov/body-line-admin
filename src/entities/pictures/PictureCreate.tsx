import React from "react";
import { FC } from "react";
import {
  Create,
  required,
  SimpleForm,
  TextInput,
  ImageInput,
  ImageField,
} from "react-admin";

export const PictureCreate: React.FC = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput
        validate={required()}
        source="alt"
        fullWidth
        helperText="Опишите фотографию"
        label="Опишите фотографию"
      />
      <ImageInput
        source="file"
        multiple={false}
        label="Фотография"
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
