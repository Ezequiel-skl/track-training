import useDynamicFavicon from "@/hooks/useDynamicFavicon";

const streak = 1; // Replace with the actual streak value
const lost = false; // Replace with the actual lost status

export default function dynamicFavicon() {
  useDynamicFavicon({ streak, lost });
}
