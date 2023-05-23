import * as Utils from '../utils';

describe('Utils', () => {
  describe('encrypt/decrypt', () => {
    it('encrypts and decrypts a string', () => {
      const contents = 'Hello world!';
      const privateKey = '12345678';

      const encrypted = Utils.encrypt({
        contents,
        privateKey,
      });

      const decrypted = Utils.decrypt({
        contents: encrypted,
        privateKey,
      });

      expect(decrypted).toEqual(contents);
    });

    it('encrypts and decrypts an object', () => {
      const contents = {foo: 'bar', hello: 'world'};
      const privateKey = '12345678';

      const encrypted = Utils.encrypt({
        contents,
        privateKey,
      });

      const decrypted = Utils.decrypt<typeof contents>({
        contents: encrypted,
        privateKey,
      });

      expect(decrypted.foo).toEqual(contents.foo);
      expect(decrypted.hello).toEqual(contents.hello);
    });
  });
});
