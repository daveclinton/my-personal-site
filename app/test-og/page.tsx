import { generateOgImageUrl, getBaseUrl } from "@/utils/url";
import Image from "next/image";

export default function OGDebugPage() {
  const testTitle = "Test Blog Post Title";
  const testDate = "2024-03-10";
  const ogImageUrl = generateOgImageUrl(testTitle, testDate);
  const baseUrl = getBaseUrl();

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">OG Image Debugger</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">Environment</h2>
          <div className="bg-gray-100 p-3 rounded">
            <p>
              <strong>Base URL:</strong> {baseUrl}
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Generated OG Image URL</h2>
          <div className="bg-gray-100 p-3 rounded overflow-x-auto">
            <code>{ogImageUrl}</code>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Preview</h2>
          <div className="border border-gray-300 rounded overflow-hidden">
            <Image
              src={ogImageUrl}
              alt="OG Image Preview"
              width={1200}
              height={628}
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Test Links</h2>
          <div className="space-y-2">
            <a
              href={ogImageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline block"
            >
              Open image directly
            </a>
            <a
              href={`https://cards-dev.twitter.com/validator?url=${encodeURIComponent(
                baseUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline block"
            >
              Test with Twitter Card Validator
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
