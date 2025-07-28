
import React from 'react';
import path from 'path';
import { promises as fs } from 'fs';
import SaveDishButton from '../../components/Cookies/index'; 

interface Dish {
    id: string; 
    local_name?: string;
    english_name: string;
    description?: string;
    countries?: string[];
    recipe?: string;
    public_cc_image_url?: string;
    language?: string;
    language_code?: string;
    continent?: string;
    regions?: string;
    cultures?: string;
    time_of_day?: string;
    time_of_day_more?: string;
    type_of_dish?: string;
    type_of_dish_more?: string;
    utensils?: string;
    drink?: string;
    occasions?: string;
    occasions_more?: string;
    ingredients?: string;
    more_details?: string;
    public_cc_image_caption?: string;
    uploaded_image_name?: string;
    uploaded_image_url?: string;
    uploaded_image_caption?: string;
}

interface OptimisedDishData {
    countries: { code: string; name: string; }[];
    dishes: { [id: string]: Dish };
    dishes_country_map: { [countryCode: string]: string[] }; 
}

interface CountryPageProps {
  params: {
    countryCode: string; 
  };
}

// Server component which fetches and renders data
export default async function CountryPage({ params }: CountryPageProps) {
    const { countryCode: countryCodeParam } = params; // Destructure and rename
    const countryCode = countryCodeParam.toUpperCase(); // Uppercase for lookup

    const filePath = path.join(process.cwd(), 'public', 'data', 'worlddishes.json');

    let data: OptimisedDishData | null = null;
    const jsonData = await fs.readFile(filePath, 'utf-8');
    data = JSON.parse(jsonData);

    //make sure data is not null
    if (!data) {
        return <div>Data not available.</div>;
    }

    const countryInfo = data.countries.find(c => c.code === countryCode);

    // prevent non existent country codes
    if (!countryInfo) {
        return <h1>404 - Country "{countryCodeParam}" Not Found</h1>;
    }

    const dishIdsForCountry: string[] = data.dishes_country_map[countryCode] || [];

    const dishesForCountry: Dish[] = dishIdsForCountry
    .map(dishId => {
        const dish = data.dishes[dishId];
        if (dish) {
            return { ...dish, id: dishId };
        }
        return undefined;
    })
    .filter((dish): dish is Dish => Boolean(dish));

    return (
    <div className='w-[100vw]'>
        <h1 className='text-3xl text-center'>Dishes from {countryInfo.name} ({countryInfo.code})</h1>
        {dishesForCountry && dishesForCountry.length > 0 ? (
        <ul className='flex flex-col items-center text-center gap-5 my-5'>
            {dishesForCountry.map((dish) => (
            <li key={dish.id} className='flex flex-col items-center border-2 rounded p-5'>
                <SaveDishButton dishId={dish.id} />
                <h3 className='text-2xl'>{dish.english_name}</h3>
                {dish.local_name && <p>({dish.local_name})</p>}
                {dish.description && <p>{dish.description}</p>}
                {dish.recipe && <p><a href={dish.recipe} target="_blank" rel="noopener noreferrer">View Recipe</a></p>}
                {dish.public_cc_image_url && dish.public_cc_image_url !== "No CC Images Available" && (
                <img src={dish.public_cc_image_url} alt={dish.english_name} style={{ width: '200px', height: 'auto' }} />
                )}
            </li>
            ))}
        </ul>
        ) : (
        <p>No dishes found for {countryInfo.name} yet.</p>
        )}
    </div>
    );
}