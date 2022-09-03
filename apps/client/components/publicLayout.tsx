export default function PublicLayout({ children }) {
  return (
    <main className="h-full">
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">{children}</div>
      </div>
    </main>
  );
}
