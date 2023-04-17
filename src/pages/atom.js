import { atomWithStorage } from "jotai/utils";
export const userAtom = atomWithStorage("user", {});
export const authAtom = atomWithStorage("authPlace", "");
export const nameGlobal = atomWithStorage("namePlace", "");
