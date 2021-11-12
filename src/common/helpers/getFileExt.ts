const getFileExt = (filename: string) => {
  // eslint-disable-next-line no-bitwise
  const extension = filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
  return `.${extension}`;
};

export { getFileExt };
