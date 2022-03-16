import { IncomingMessage, ServerResponse } from "http";
import Container from "typedi";
import { AuthService } from "./users/services";

export default async function context({ req }: { req: IncomingMessage, res: ServerResponse }) {
  const authorization = req.headers.authorization;
  if (!authorization?.startsWith('Bearer')) return;
  const accessToken = authorization.replace('Bearer ', '');
  if (!accessToken) return;

  const authService: AuthService = Container.get<AuthService>(AuthService);
  const user = await authService.getUserByAccessToken(accessToken);
  if (!user) return;
  return { user };
}
