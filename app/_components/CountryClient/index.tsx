"use client";

import { Dish, Country } from "@/types/dish";
import Link from "next/link";
import DishCard from "@/app/_components/dishcard";

interface CountryPageProps {
  dishes: Dish[];
  countryInfo: Country;
}

export default function CountryPage({ dishes, countryInfo }: CountryPageProps) {
  return (
    <div className="p-20 min-h-[70vh]">
      <h1 className="text-3xl font-bold text-center">
        Dishes from {countryInfo.name} ({countryInfo.code})
      </h1>
      {dishes && dishes.length > 0 ? (
        <div>
          <ul className="flex flex-wrap justify-center gap-6 my-8">
            {dishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} saveDish={true} />
            ))}
          </ul>
          <div className="mt-8 gap-2 flex flex-col text-center">
            <p>Got suggestions? Click bellow to contribute.</p>
            <Link href="/adddish">
              <button className="btn">Suggest</button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 gap-2 flex flex-col text-center">
          <p>No dishes found for {countryInfo.name} yet.</p>
          <p>Got suggestions? Click bellow to contribute.</p>
          <Link href="/adddish">
            <button className="btn">Suggest</button>
          </Link>
        </div>
      )}
    </div>
  );
}
