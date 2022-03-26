import * as Keychain from 'react-native-keychain';

const DEFAULT_TOKEN: string = '';
const AUTH_TOKEN_KEY: string = 'authToken';

let token: string = DEFAULT_TOKEN;

export async function getToken(): Promise<string> {
  if (!token) {
    try {
      // Retrieve the credentials
      const credentials = await Keychain.getGenericPassword();
  
      token = (credentials && credentials.password) || DEFAULT_TOKEN;
    } catch (error) {
      token = DEFAULT_TOKEN;
    }
  }
  
  return token;
}

export async function setToken(accessToken: string): Promise<void> {
  token = accessToken;
  await Keychain.setGenericPassword(AUTH_TOKEN_KEY, accessToken);
}

export async function logout(): Promise<void> {
  token = DEFAULT_TOKEN;
  await Keychain.resetGenericPassword();
}
