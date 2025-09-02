import { fetchAllDishes } from "@/lib/config";
import Randomiser from "../_components/RandomClient";

export default async function RandomiserPage() {
  const dishes = await fetchAllDishes();

  return <Randomiser dishes={dishes} />;
}
