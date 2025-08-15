import json
from typing import List, Dict
from dataclasses import dataclass, field
from datetime import datetime
import os

@dataclass
class Country:
    code: str
    name: str

    def to_dict(self) -> Dict[str, str]:
        return {"code": self.code, "name": self.name}

@dataclass
class Dish:
    id: int
    local_name: str
    country_code: List[str]
    english_name: str = ''
    description: str = ''
    countries: List[str] = field(default_factory=list)
    recipe: str = ''
    public_cc_image_url: str = ''
    language: List[str] = field(default_factory=list)
    language_code: str = ''
    continent: str = ''
    regions: str = ''
    cultures: str = ''
    time_of_day: List[str] = field(default_factory=list)
    time_of_day_more: str = ''
    type_of_dish: List[str] = field(default_factory=list)
    type_of_dish_more: str = ''
    utensils: str = ''
    drink: str = ''
    occasions: List[str] = field(default_factory=list)
    occasions_more: str = ''
    ingredients: List[str] = field(default_factory=list)
    more_details: str = ''
    public_cc_image_caption: str = ''
    uploaded_image_name: str = ''
    uploaded_image_url: str = ''
    uploaded_image_caption: str = ''

    def to_dict(self) -> Dict:
        return {
            "id": self.id,
            "local_name": self.local_name,
            "country_code": self.country_code,
            "english_name": self.english_name,
            "description": self.description,
            "countries": self.countries,
            "recipe": self.recipe,
            "public_cc_image_url": self.public_cc_image_url,
            "language": self.language,
            "language_code": self.language_code,
            "continent": self.continent,
            "regions": self.regions,
            "cultures": self.cultures,
            "time_of_day": self.time_of_day,
            "time_of_day_more": self.time_of_day_more,
            "type_of_dish": self.type_of_dish,
            "type_of_dish_more": self.type_of_dish_more,
            "utensils": self.utensils,
            "drink": self.drink,
            "occasions": self.occasions,
            "occasions_more": self.occasions_more,
            "ingredients": self.ingredients,
            "more_details": self.more_details,
            "public_cc_image_caption": self.public_cc_image_caption,
            "uploaded_image_name": self.uploaded_image_name,
            "uploaded_image_url": self.uploaded_image_url,
            "uploaded_image_caption": self.uploaded_image_caption,
        }


def parse_email_js_template(data_string: str) -> Dict[str, str]:
    parsed: Dict[str, str] = {}
    lines = [line.strip() for line in data_string.splitlines() if line.strip()]

    i = 0
    while i < len(lines):
        line = lines[i]
        if line.endswith(':'):
            key = line[:-1]
            i += 1
            if i < len(lines) and not lines[i].endswith(':'):
                parsed[key] = lines[i]
                i += 1
            else:
                parsed[key] = ''
        else:
            # skip unexpected formats
            i += 1
    return parsed


def clean_parsed_data(data: Dict[str, str]) -> Dict:
    list_fields = ['language', 'country_code', 'countries', 'time_of_day', 'type_of_dish', 'occasions']
    cleaned: Dict = {}

    for key, value in data.items():
        if key in list_fields:
            cleaned[key] = [item.strip() for item in value.split(',') if item.strip()]
        elif key == 'ingredients':
            cleaned[key] = [item.strip().lower() for item in value.split(',') if item.strip()]
        else:
            cleaned[key] = value
    return cleaned


def get_next_available_id(json_file: str) -> int:
    try:
        with open(json_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        ids = [int(k) for k in data.get('dishes', {})]
        return max(ids, default=0) + 1
    except (FileNotFoundError, json.JSONDecodeError):
        return 1


def write_json(new_data: Dict, filename: str = 'worlddishes.json') -> None:
    try:
        with open(filename, 'r+', encoding='utf-8') as f:
            file_data = json.load(f)
            # insert new dish
            file_data.setdefault('dishes', {})[str(new_data['id'])] = new_data
            # update country map
            country_map = file_data.setdefault('dishes_country_map', {})
            for cc in new_data['country_code']:
                country_map.setdefault(cc, []).append(str(new_data['id']))
            # overwrite file
            f.seek(0)
            json.dump(file_data, f, indent=4)
            f.truncate()
    except Exception as e:
        raise RuntimeError(f"Failed to write JSON: {e}")

def writeToVersionHistory(dish):
    """
    format:
    {
    date: "2025-08-14",
    dishes: ["Šaltibarščiai", "Pad Thai", "Shakshuka"],
    }
    """


    today_str = datetime.today().strftime('%Y-%m-%d')
    filepath = '../public/data/versionHistory.json'

    # Load existing data
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            try:
                history = json.load(f)
            except json.JSONDecodeError:
                history = []
    else:
        history = []

    # Ensure structure is a list
    if not isinstance(history, list):
        history = []

    # Check if first entry matches today's date
    if history and history[0].get("date") == today_str:
        if dish.local_name not in history[0]["dishes"]:
            history[0]["dishes"].append(dish.local_name)
    else:
        # New date entry at the top
        history.insert(0, {
            "date": today_str,
            "dishes": [dish.local_name]
        })

    # Save back
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(history, f, ensure_ascii=False, indent=4)
        print(f"succesfully added a new version")


if __name__ == '__main__':
    with open('dishinput.txt', 'r', encoding='utf-8') as f:
        raw = f.read()

    parsed = parse_email_js_template(raw)
    cleaned = clean_parsed_data(parsed)
    nid = get_next_available_id('worlddishes.json')
    dish = Dish(id=nid, **cleaned)
    write_json(dish.to_dict())
    print(f"Succesfully added new dish {dish.local_name} to worlddishes.json in the same directory")

    writeToVersionHistory(dish)
