"use client";

import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
import rawCountryList from "@/public/data/countrytocode.json";
import { Dish } from "@/types/dish";

type MultiSelectOption = {
  name: string;
  value: string;
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
  const [formData, setFormData] = useState<Dish>({
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

  const handleMultiSelectChange = (field: keyof Dish) => (selected: any) => {
    const values = selected
      ? selected.map((s: any) => ({
          name: s.label,
          value: s.value,
        }))
      : [];

    // Update React formData state
    setFormData((prev) => ({
      ...prev,
      [field]: values,
    }));

    // Sync hidden input for EmailJS
    const hiddenInput = document.querySelector<HTMLInputElement>(
      `input[name="${field}"]`
    );
    if (hiddenInput) {
      hiddenInput.value = values
        .map((v: MultiSelectOption) => v.value)
        .join(", ");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const now = Date.now();
    localStorage.setItem("lastSubmit", now.toString());
    setSubmitted(true);

    const res = await fetch("/api/submit-dish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error("Error:", result.error);
      return;
    }

    console.log("Dish submitted:", result);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-[70vh]">
      <h1 className="text-2xl font-bold mb-4">Suggest your favourite dish!</h1>
      <p className="mb-4 text-gray-600 italic">
        You are only allowed to suggest one dish per day due to email traffic
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
            type="hidden"
            name="time_of_day"
            value={
              formData.time_of_day?.map((t: any) => t.value).join(", ") || ""
            }
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
            type="hidden"
            name="type_of_dish"
            value={
              formData.type_of_dish?.map((t: any) => t.value).join(", ") || ""
            }
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
            type="hidden"
            name="occasions"
            value={
              formData.occasions?.map((t: any) => t.value).join(", ") || ""
            }
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
