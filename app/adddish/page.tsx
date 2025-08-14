"use client";

import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Select from "react-select";
import rawCountryList from "@/public/data/countrytocode.json";

type DishForm = {
  id: string;
  local_name: string;
  country_code: string[];
  english_name?: string;
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
};

const countryOptions = rawCountryList.countries.map((country) => ({
  value: country.code,
  label: country.name,
}));

const timeOfDayOptions = [
  "anytime",
  "breakfast",
  "dinner",
  "lunch",
  "other",
  "snack",
].map((v) => ({ value: v, label: v }));

const typeOfDishOptions = [
  "Dessert",
  "Main dish - eaten with sides",
  "Main dish - stand alone (e.g. one pot meal)",
  "Other",
  "Salad",
  "Sauce",
  "Side dish",
  "Small plate / bowl for sharing",
  "Small plate / bowl served as a part of a collection",
  "Soup",
  "Starter",
].map((v) => ({ value: v, label: v }));

const occasionOptions = ["regular", "special", "both"].map((v) => ({
  value: v,
  label: v,
}));

export default function FormPage() {
  const [formData, setFormData] = useState<DishForm>({
    id: "",
    local_name: "",
    country_code: [],
    countries: [],
  });

  const [selectedCountries, setSelectedCountries] = useState<
    { value: string; label: string }[]
  >([]);
  const [submitted, setSubmitted] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const lastSubmit = localStorage.getItem("lastSubmit");
    const now = Date.now();

    if (lastSubmit && now - parseInt(lastSubmit) < 24 * 60 * 60 * 1000) {
      setSubmitted(true);
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMultiSelectChange =
    (field: keyof DishForm) => (selected: any) => {
      const values = selected ? selected.map((s: any) => s.value) : [];
      setFormData((prev) => ({ ...prev, [field]: values }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const now = Date.now();
    localStorage.setItem("lastSubmit", now.toString());
    setSubmitted(true);

    emailjs
      .sendForm("service_dh2b4l6", "template_60b33vo", form.current!, {
        publicKey: "b4eCQccMZwYwhbeSG",
      })
      .then(() => {
        localStorage.setItem("lastSubmit", now.toString());
        console.log("SUCCESS!");
      })
      .catch((error) => {
        console.log("FAILED...", error.text);
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add your favourite dish!</h1>
      <p className="mb-4 text-gray-600 italic">
        You are only allowed to send one dish per day due to email traffic
        reasons. Thank you for understanding.
      </p>

      {!submitted ? (
        <form
          ref={form}
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Text/textarea fields */}
          <input
            key="local_name"
            name="local_name"
            value={formData.local_name}
            onChange={handleChange}
            placeholder="Local name"
            className="border p-2 rounded col-span-2"
            required
          />
          <Select
            isMulti
            placeholder={"Time Of Day"}
            options={timeOfDayOptions}
            onChange={handleMultiSelectChange("time_of_day")}
            classNamePrefix="select"
          />
          <input
            key={"time_of_day_more"}
            name={"time_of_day_more"}
            value={(formData as any)["time_of_day_more"] || ""}
            onChange={handleChange}
            placeholder={"Time of day explanation"}
            className="border p-2 rounded"
          />

          <Select
            isMulti
            options={typeOfDishOptions}
            placeholder={"Type Of Dish"}
            onChange={handleMultiSelectChange("type_of_dish")}
            className=""
            classNamePrefix="select"
          />
          <input
            key={"type_of_dish_more"}
            name={"type_of_dish_more"}
            value={(formData as any)["type_of_dish_more"] || ""}
            onChange={handleChange}
            placeholder={"Type of dish explanation"}
            className="border p-2 rounded"
          />

          <Select
            isMulti
            options={occasionOptions}
            placeholder={"Occasion"}
            onChange={handleMultiSelectChange("occasions")}
            className=""
            classNamePrefix="select"
          />
          <input
            key={"occasions_more"}
            name={"occasions_more"}
            value={(formData as any)["occasions_more"] || ""}
            onChange={handleChange}
            placeholder={"Occasions explanation"}
            className="border p-2 rounded"
          />

          <input
            key={"recipe"}
            name={"recipe"}
            value={(formData as any)["recipe"] || ""}
            onChange={handleChange}
            placeholder={"recipe url"}
            className="border p-2 rounded"
          ></input>

          {[
            "english_name",
            "public_cc_image_url",
            "public_cc_image_caption",
            "language",
            "cultures",
            "regions",
            "continent",
            "utensils",
            "drink",
            "ingredients",
            "description",
          ].map((field) =>
            ["description"].includes(field) ? (
              <textarea
                key={field}
                name={field}
                value={(formData as any)[field] || ""}
                onChange={handleChange}
                placeholder={field.replace(/_/g, " ")}
                className="border p-2 rounded"
              />
            ) : (
              <input
                key={field}
                name={field}
                value={(formData as any)[field] || ""}
                onChange={handleChange}
                placeholder={field.replace(/_/g, " ")}
                className="border p-2 rounded"
              />
            )
          )}

          {/* Country dropdown */}
          <Select
            required
            isMulti
            options={countryOptions}
            value={selectedCountries}
            placeholder={"Countries... (can select multiple)"}
            className="basic-multi-select col-span-2"
            classNamePrefix="select"
            onChange={(selected) => {
              const selectedArray = Array.isArray(selected) ? selected : [];
              setSelectedCountries(selectedArray);

              setFormData((prev) => ({
                ...prev,
                country_code: selectedArray.map((item) => item.value),
                countries: selectedArray.map((item) => item.label),
              }));
            }}
          />

          {/* Hidden inputs for EmailJS */}
          <input
            type="hidden"
            name="country_code"
            value={formData.country_code.join(",")}
          />
          <input
            type="hidden"
            name="countries"
            value={formData.countries?.join(",")}
          />

          <button type="submit" className="btn col-span-2">
            Submit
          </button>
        </form>
      ) : (
        <div className="text-green-700 bg-green-100 p-4 rounded col-span-2">
          Thank you! You've already sent us your favourite dish today. Yummmm.
        </div>
      )}
    </div>
  );
}
