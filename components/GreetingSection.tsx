import Link from "next/link";

export default function GreetingSection() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Hey Legend 😎,</h2>
      <p className="mb-4">
        All things here are Software Engineering related! You can subscribe to
        receive an article straight into your inbox every Sunday on my{" "}
        <Link href="#" className="text-pink-400 hover:underline">
          Substack
        </Link>
        .
      </p>
      <p className="mb-4">
        My posts are a collaborative space, so feel free to reply if:
      </p>
      <ul className="list-disc list-inside mb-4 space-y-2">
        <li>
          🚩 There&apos;s a topic you&apos;re curious about and would love to
          read about on my blog.
        </li>
        <li>
          🏆 You know about good resources that could benefit fellow aspiring
          Software Engineers.
        </li>
        <li>👋 You just want to say hello. :</li>
      </ul>
      <p>
        I will always be happy to share more with you. Check out my about here
        :)
        <Link href="#" className="text-pink-400 hover:underline">
          About
        </Link>
        section.
      </p>
    </section>
  );
}
