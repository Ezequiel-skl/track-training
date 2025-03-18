import { create } from "zustand";

type DayTraining = {
  days: number[];
  toggleDay: (dayIndex: number) => void;
  saveDays: () => void;
};

const useDayTraining = create<DayTraining>((set) => ({
  days: JSON.parse(localStorage.getItem("day") || "[]"),

  toggleDay: (dayIndex) =>
    set((state) => ({
      days: state.days.includes(dayIndex)
        ? state.days.filter((d) => d !== dayIndex)
        : [...state.days, dayIndex],
    })),

  saveDays: () => {
    set((state) => {
      localStorage.setItem("day", JSON.stringify(state.days));
      return state;
    });
  },
}));

export { useDayTraining };
