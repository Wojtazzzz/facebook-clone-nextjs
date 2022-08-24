export const generateFile = (name: string, type: string) => new File([JSON.stringify({ ping: true })], name, { type });
