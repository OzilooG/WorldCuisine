import path from "path";
import { promises as fs } from "fs";
import SavedDishes from "../components/CookiesDisplay/index"; // adjust path

export default async function SavedPage() {
  const filePath = path.join(
    process.cwd(),
    "public",
    "data",
    "worlddishes.json"
  );
  const jsonData = await fs.readFile(filePath, "utf-8");
  const data = JSON.parse(jsonData);

  return (
    <div className="mt-15 w-[100vw]">
      <h1 className="text-3xl font-bold text-center">Your Saved Dishes</h1>
      <SavedDishes allDishes={data.dishes} />
    </div>
  );
}
