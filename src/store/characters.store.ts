import { create } from 'zustand'

import { ICharacters } from '@/models/Characters'

type StateProps = {
    characters?: ICharacters;
    setCharacters: (characters: ICharacters) => void
}

export const useCharactersStore = create<StateProps>((set) => ({
    characters: undefined,
    setCharacters: (characters: ICharacters) => set((state) => ({
        characters,
    })),
}));
