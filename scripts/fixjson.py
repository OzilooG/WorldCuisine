import json
import ast

def convertToLists():
    with open ('worlddishes.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    ingredients = []

    for dish in data['dishes']:
        raw_ingredients = data['dishes'][dish]['ingredients']
        ingredients = [i.strip().lower() for i in raw_ingredients.split(',') if i.strip()]
        
        raw_countries = data['dishes'][dish]['countries']
        countries = [i.strip() for i in raw_countries.split(',')]

        raw_country_codes = data['dishes'][dish]['country_code']
        country_codes = [i.strip() for i in raw_country_codes.split(',')]

        raw_languages = data['dishes'][dish]['language']
        languages = [i.strip() for i in raw_languages.split(',')]

        raw_occasions = data['dishes'][dish]['occasions']
        occasions = [i.strip() for i in raw_occasions.split(',')]

        data['dishes'][dish]['ingredients'] = ingredients
        data['dishes'][dish]['countries'] = countries
        data['dishes'][dish]['country_code'] = country_codes
        data['dishes'][dish]['language'] = languages
        data['dishes'][dish]['occasions'] = occasions
        
        for key in ['time_of_day', 'type_of_dish']:
            value = data['dishes'][dish].get(key)
            if isinstance(value, str) and value.startswith('[') and value.endswith(']'):
                data['dishes'][dish][key] = ast.literal_eval(value)
            


    with open('worlddishes_altered.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

def countUniques():
    unique_times = set()
    unique_types = set()
    unique_occasions = set()
    unique_ingredients = set()
    with open('worlddishes_altered.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    for dish in data['dishes']:
        for time in data['dishes'][dish]['time_of_day']:
            unique_times.add(time)
        for type_ in data['dishes'][dish]['type_of_dish']:
            unique_types.add(type_)
        for occasion in data['dishes'][dish]['occasions']:
            unique_occasions.add(occasion)
        for ingredient in data['dishes'][dish]['ingredients']:
            unique_ingredients.add(ingredient)

    with open('uniques.txt', 'w', encoding='utf-8') as f:
        f.write("Unique times of day:\n")
        f.write("\n".join(sorted(unique_times)) + "\n\n")

        f.write("Unique types of dishes:\n")
        f.write("\n".join(sorted(unique_types)) + "\n\n")

        f.write("Unique types of occasions:\n")
        f.write("\n".join(sorted(unique_occasions)) + "\n\n")

        f.write("Unique types of ingredients:\n")
        f.write("\n".join(sorted(unique_ingredients)) + "\n")



countUniques()
    