import { Token } from "typedi";

export const GLOBALS_TOKEN = new Token<string>('@Container/GLOBALS');
export const PRISMA_TOKEN = new Token<string>('@Container/PRISMA');
export const QUEUE_TOKEN = new Token<string>('@Container/QUEUE');
