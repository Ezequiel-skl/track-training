import { create } from "zustand";

type trackDays = {
  date: number;
  type: "faildDays" | "successDays";
}

type TrainingStats = {
  streak: number;
  days: trackDays[];
  saveDays: (isSuccess: boolean) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  hasTrainedToday: () => boolean;
}

const useTrainingStats = create<TrainingStats>()((set, get) => ({
  streak: Number.parseInt(localStorage.getItem("streak") || "0"),
  days: JSON.parse(localStorage.getItem("days") || "[]"),

  saveDays: (isSuccess) => {
    set((state) => {
      const today = new Date().setHours(0, 0, 0, 0);
      const newDay: trackDays = {date: today, type: isSuccess ? "successDays" : "faildDays"} 

      const updateDay = [...state.days, newDay];
      localStorage.setItem("days", JSON.stringify(updateDay));

      return {days: updateDay}
    })
  },

  incrementStreak: () => {
    set((state) => {
      const newStreak = state.streak + 1;
      localStorage.setItem("streak", newStreak.toString());
      return { streak: newStreak }
    })
  },

  resetStreak: () => {
    set(() => {
      localStorage.setItem("streak", "0");
      return { streak: 0 }
    })
  },

  hasTrainedToday: () => {
    const today = new Date().setHours(0, 0, 0, 0);
    return get().days.some((day) => day.date === today && day.type === "successDays");
  },
}))

export { useTrainingStats }
