import React from 'react';
import { TextInput } from 'react-admin';

type RichInputProps = {
  source: any,
  customVariant: any,
  [p: string]: any
}

export const RichInput: React.FC<RichInputProps> = (props) => {
  return (<TextInput {...props} variant={props.customVariant} />);
}