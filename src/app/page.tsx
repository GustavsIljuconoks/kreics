import NavBar from "@/ui/nav-bar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div
        id="content"
        className="w-full px-8 py-20 sm:p-lg md:px-16 md:py-20 xl:px-32"
      >
        <div className="lg:flex w-full">
          <NavBar />

          <div className="lg:w-5/6 text-center mt-16">
            <h1 className="text-orange text-6xl lg:text-8xl font-bold mb-4">
              KREICS
            </h1>

            <h4 className="text-black-70 text-md lg:text-2xl font-bold mb-8">
              portraying a feeling
            </h4>

            <p className="text-black-40 font-semibold text-md lg:text-2.5xl">
              check out my work{" "}
              <a href="/works" className="underline hover:text-black-70">
                here
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
