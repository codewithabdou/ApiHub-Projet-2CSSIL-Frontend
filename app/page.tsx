import Navbar from "@app/components/Shared/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-start space-y-4 p-24">
        <h1 className="text-4xl font-bold text-primary">title</h1>
        <p className="text-lg font-medium text-primary">description</p>
      </main>
    </>
  );
}
