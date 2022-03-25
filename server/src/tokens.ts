import { Token } from "typedi";

import { Globals } from "./shared/types";

export const GLOBALS_TOKEN = new Token<Globals>('@Container/GLOBALS');
export const PRISMA_TOKEN = new Token<string>('@Container/PRISMA');
export const QUEUE_TOKEN = new Token<string>('@Container/QUEUE');
