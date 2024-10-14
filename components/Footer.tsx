import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-center py-4">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p>&copy; 2024 David Clinton. All rights reserved.</p>
        <div className="mt-2">
          <Link href="/privacy" className="text-gray-400 hover:text-white mx-2">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-gray-400 hover:text-white mx-2">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
