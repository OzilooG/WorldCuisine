import { fetchAllDishes } from "@/lib/config";
import Discover from "../_components/DiscoverClient";

export default async function DiscoverPage() {
  const dishes = await fetchAllDishes();

  return <Discover dishes={dishes} />;
}
