"use client";

import { useState, useEffect } from "react";

type VersionUpdate = {
  date: string;
  dishes: string[];
};

export default function VersionHistoryPage() {
  const [updates, setUpdates] = useState<VersionUpdate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/versionHistory.json")
      .then((res) => res.json())
      .then((data) => {
        setUpdates(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load version history:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Version History</h1>
        <p className="text-gray-600">Loading updates...</p>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Version History</h1>
      <p className="mb-8 text-gray-600">
        See the latest updates to our global dish collection. New dishes are
        added regularly.
      </p>

      {updates.length === 0 ? (
        <p className="text-gray-500">No updates available.</p>
      ) : (
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
      )}
    </main>
  );
}
