import { createWire, createSelector } from '@forminator/react-wire'

export const page = createWire('home')

export const blockchain = createWire(null)

export const hasBlockchain = createSelector({
    get: ({ get }) => get(blockchain)?.chain?.length > 0
})
