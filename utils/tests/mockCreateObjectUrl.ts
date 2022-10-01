export const mockCreateObjectUrl = () =>
    (global.URL.createObjectURL = jest.fn((file) => `blob:http:localhost:3000/${file}`));
