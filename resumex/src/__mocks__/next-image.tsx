import React from 'react';

const Image = (props: any) => {
  const { src, alt, ...rest } = props;
  return <img src={src} alt={alt} {...rest} />;
};

export default Image; 