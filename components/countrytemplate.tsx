import React from "react";

interface Dish {
  name: string;
  description: string;
}

interface CountryDishes {
    dishes: Dish[];
}

interface CountryDishesProps {
    dishes: CountryDishes;
    countryName: string;
}


const CountryPageTemplate: React.FC<CountryDishesProps> = ({
  countryName,
  dishes,
}) => {
    return (
        <div>
            <h1>{countryName}</h1>
            {dishes.map(Dish)

            }
        </div>
    );
};

export default CountryPageTemplate;