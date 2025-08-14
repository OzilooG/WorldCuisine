import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white py-10 px-6 md:px-16 mt-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold mb-2">World Dishes</h2>
          <p className="text-white/80 text-sm">
            Discover, save, and share dishes from around the globe.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-white/80">
            <li>
              <Link href="/map" className="hover:text-white transition-colors">
                Map
              </Link>
            </li>
            <li>
              <Link
                href="/discover"
                className="hover:text-white transition-colors"
              >
                Discover
              </Link>
            </li>
            <li>
              <Link
                href="/saveddishes"
                className="hover:text-white transition-colors"
              >
                Saved Dishes
              </Link>
            </li>
            <li>
              <Link
                href="/version-history"
                className="hover:text-white transition-colors"
              >
                Version History
              </Link>
            </li>
            <li>
              <Link
                href="/adddish"
                className="hover:text-white transition-colors"
              >
                Suggest a Dish
              </Link>
            </li>
          </ul>
        </div>

        {/* Copyright */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-3">Stay Connected</h3>
            <p className="text-white/80 text-sm">
              Any questions? Suggestions? Email us:
            </p>
            <p>world.info.cuisine@gmail.com</p>
          </div>
          <p className="mt-6 text-sm text-white/60">
            &copy; {new Date().getFullYear()} World Dishes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
