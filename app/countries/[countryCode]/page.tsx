import { fetchAllCountries, fetchCountryDishes } from "@/lib/config";
import CountryPage from "@/app/_components/CountryClient";
import { Country } from "@/types/dish";

interface CountryPageProps {
  params: Promise<{
    countryCode: string;
  }>;
}

export default async function CountriesPage({ params }: CountryPageProps) {
  const awaited_params = await params;
  const dishes = await fetchCountryDishes(awaited_params.countryCode);
  const countries = await fetchAllCountries();
  const countryInfo = countries.find(
    (c) => c.code === awaited_params.countryCode
  );

  if (!countryInfo) {
    return (
      <div className="text-3xl bold text-center flex justify-center items-center h-70">
        Country not found
      </div>
    );
  }

  return <CountryPage countryInfo={countryInfo} dishes={dishes} />;
}
