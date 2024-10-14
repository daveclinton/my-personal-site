import Image from "next/image";
import Link from "next/link";
export default function HeroSection() {
  return (
    <section className="bg-gray-800 rounded-lg p-8 mb-12 ">
      <div className="flex items-center mb-6">
        <div className="relative">
          <div className="absolute  rounded-full animate-ping">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" />
          </div>
          <div className="relative  rounded-full mr-6">
            <Image
              src="/images/davecl.jpg"
              alt="Profile Image"
              className="h-16 w-16 rounded-full"
              width={64}
              height={64}
            />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">David Clinton</h1>
          <p className="text-gray-400">Mobile & Frontend Engineer</p>
        </div>
      </div>
      <p className="mb-4">
        Looking to hire me? Email me @ contact@daveclinton.cc 📋
      </p>
      <p>
        Need consulting? Book a call with me{" "}
        <Link
          href="https://cal.com/david-clinton-ucuv7n"
          className="text-pink-400 hover:underline"
        >
          here
        </Link>
      </p>
      <div className="flex space-x-4 mt-6">
        <Link
          href="https://daveclintonn.substack.com/"
          className="text-gray-400 hover:text-white"
        >
          <span className="sr-only">RSS</span>
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12.8 16C12.8 8.978 7.022 3.2 0 3.2V0c8.777 0 16 7.223 16 16h-3.2zM2.194 11.61c1.21 0 2.195.985 2.195 2.196 0 1.21-.99 2.194-2.2 2.194C.98 16 0 15.017 0 13.806c0-1.21.983-2.195 2.194-2.195zM10.606 16h-3.11c0-4.113-3.383-7.497-7.496-7.497v-3.11c5.818 0 10.606 4.79 10.606 10.607z" />
          </svg>
        </Link>
        <Link
          href="https://www.linkedin.com/in/clintondavid46/"
          className="text-gray-400 hover:text-white"
        >
          <span className="sr-only">Linkedin</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-linkedin"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </Link>
        <Link
          href="https://github.com/daveclinton"
          className="text-gray-400 hover:text-white"
        >
          <span className="sr-only">GitHub</span>
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
