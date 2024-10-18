import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="text-center p-8 rounded-lg bg-gray-800 shadow-lg">
        <Loader className="w-16 h-16 animate-spin text-pink-500 mx-auto" />
        <h2 className="mt-4 text-2xl font-semibold text-pink-300">
          Loading Analytics...
        </h2>
        <p className="mt-2 text-pink-200 text-sm">
          Please wait while we crunch the numbers
        </p>
      </div>
    </div>
  );
}
