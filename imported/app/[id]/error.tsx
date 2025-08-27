"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-2xl font-bold text-red-600 mb-4">حدث خطأ</h1>
      <p className="text-gray-700 mb-6">
        {`${error}` || "لم نتمكن من تحميل السيارات"}
      </p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-[#CE931A] text-white rounded-lg hover:opacity-90"
      >
        إعادة المحاولة
      </button>
    </div>
  );
}
