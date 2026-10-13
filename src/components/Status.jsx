export function Loader() {
  return (
    <p className="py-10 text-center text-gray-500 dark:text-gray-400">
      Loading...
    </p>
  );
}

export function ErrorMessage({ message }) {
  return (
    <p className="rounded-lg bg-red-50 p-4 text-red-600 dark:bg-red-950 dark:text-red-300">
      {message}
    </p>
  );
}