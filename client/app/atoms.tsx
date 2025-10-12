import {atom } from "jotai";
import { UserData } from "~/types/UserData";

export const userAtom = atom<UserData | null>(null);

export const loginErrorMessageAtom = atom<string | null>(null);
