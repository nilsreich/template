import create from 'zustand'
import { persist } from 'zustand/middleware'

interface MyState {
  fishes: number
  addAFish: (by: number) => void
  removeFish: (by: number) => void
}

export const useFishStore = create<MyState>()(
  persist(
    (set, get) => ({
      fishes: 0,
      addAFish: (by) => set({ fishes: get().fishes + by }),
      removeFish: (by) => set({ fishes: get().fishes - by }),
    }),
    {
      name: 'food-storage',
    }
  )
)