import { create } from "zustand";
import { persist } from "zustand/middleware";
type StudyState = {
  saved: string[];
  completed: string[];
  toggleSaved: (id: string) => void;
  complete: (id: string) => void;
};
export const useStudy = create<StudyState>()(
  persist(
    (set) => ({
      saved: [],
      completed: [],
      toggleSaved: (id) =>
        set((s) => ({
          saved: s.saved.includes(id)
            ? s.saved.filter((x) => x !== id)
            : [...s.saved, id],
        })),
      complete: (id) =>
        set((s) => ({
          completed: s.completed.includes(id)
            ? s.completed
            : [...s.completed, id],
        })),
    }),
    { name: "organui-study-v1" },
  ),
);
