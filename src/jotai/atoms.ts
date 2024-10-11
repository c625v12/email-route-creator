import { atom } from 'jotai';

export const domainAtom = atom<string>('');
export const emailRouteAtom = atom<string | undefined>('');
export const destinationEmailAtom = atom<string | undefined>(undefined);
export const isLoadingAtom = atom<boolean>(false);
export const newEmailRouteAtom = atom<string | undefined>('');
export const emailRoutesAtom = atom<string[] | undefined>([]);
