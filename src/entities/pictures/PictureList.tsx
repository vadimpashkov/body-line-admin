import React from "react";
import {
  Datagrid,
  List,
  TextField,
  FunctionField,
  DeleteButton,
} from "react-admin";

export const PictureList: React.FC = (props) => {
  return (
    <List {...props} title="Список картинок">
      <Datagrid isRowSelectable={() => false}>
        <TextField source="alt" label="Описание фотографии" />
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
