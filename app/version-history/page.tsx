"use client";

export default function VersionHistoryPage() {
  const updates = [
    {
      date: "2025-08-14",
      dishes: ["Šaltibarščiai", "Pad Thai", "Shakshuka"],
    },
    {
      date: "2025-08-10",
      dishes: ["Poutine", "Tom Yum Soup"],
    },
    {
      date: "2025-08-05",
      dishes: ["Sushi", "Ramen", "Miso Soup"],
    },
  ];

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Version History</h1>
      <p className="mb-8 text-gray-600">
        See the latest updates to our global dish collection. New dishes are
        added regularly.
      </p>

      <div className="space-y-8">
        {updates.map((update, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-secondary mb-3">
              {update.date}
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              {update.dishes.map((dish, i) => (
                <li key={i}>{dish}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
