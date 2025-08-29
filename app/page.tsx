"use client";
import Link from "next/link";
import { Compass, Heart, Shuffle, PlusCircle } from "lucide-react";
import SimpleMapDisplay from "./components/Worldmap";

export default function HomePage() {
  return (
    <main className="bg-background text-textcolour">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-secondary to-accent text-white py-20 px-6 md:px-16">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Discover Delicious Dishes from Every Corner of the Globe
          </h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
            Explore world cuisines, save your favourites, and share your own
            culinary creations. One map, countless flavours.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link
              href="/map"
              className="bg-white text-secondary px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-transform"
            >
              Explore the Map
            </Link>
            <Link
              href="/adddish"
              className="bg-white/10 border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
            >
              Suggest a Dish
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why You’ll Love World Dishes
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              icon: <Compass size={32} className="text-secondary" />,
              title: "Discover",
              desc: "Find authentic dishes from every region on an interactive map.",
            },
            {
              icon: <Heart size={32} className="text-primary" />,
              title: "Save Your Favourites",
              desc: "Keep track of dishes you want to try later.",
            },
            {
              icon: <Shuffle size={32} />,
              title: "Get Inspired",
              desc: "Use the randomizer to discover something new every day.",
            },
            {
              icon: <PlusCircle size={32} className="text-accent" />,
              title: "Contribute",
              desc: "Add your own recipes and share them with the world.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-16 px-6 md:px-16 bg-accent/10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Take a Sneak Peek at the Map
          </h2>
          <p className="text-gray-700 mb-8">
            Our interactive map makes it easy to explore dishes by location.
            Just click on a country from which you would like to see the dishes!
          </p>
          <div className="rounded-xl mx-auto overflow-hidden shadow-lg ">
            <div className="mx-auto w-[300vw] md:w-[90vw]">
              <SimpleMapDisplay />
            </div>
          </div>
          <Link
            href="/map"
            className="inline-block mt-8 btn text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:scale-105 transition-all"
          >
            Explore the Map
          </Link>
        </div>
      </section>
    </main>
  );
}
