import SavedDishes from "../_components/CookiesDisplay/index";
import { fetchAllDishes } from "@/lib/config";

export default async function SavedPage() {
  const dishes = await fetchAllDishes();
  return (
    <div className="my-20 min-h-[70vh]">
      <h1 className="text-3xl font-bold text-center">Your Saved Dishes</h1>
      <SavedDishes dishes={dishes} />
    </div>
  );
}
