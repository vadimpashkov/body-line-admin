import React from 'react';

type RichElemProps = {}

const RichElem: React.FC<any> = ({ Elem, priority, ...props }) => {
  return (
    <Elem {...props} {...priority} />
  );
}