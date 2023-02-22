import { atom } from "recoil";

interface TmpType {
  businessName: string;
  address: string;
}

export const tmpState = atom<TmpType[]>({
  key: "tmp",
  default: [],
});
