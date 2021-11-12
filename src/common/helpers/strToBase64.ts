const strToBase64 = (str: string) => Buffer.from(str).toString('base64');

export { strToBase64 };
