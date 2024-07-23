import NavBar from "@/ui/nav-bar";

export default function Page() {
  return (
    <div className="w-full flex justify-center">
      <div className="lg:flex w-full">
        <NavBar />

        <div className="lg:w-5/6 text-center ml-5">
          <div className="description mb-36">
            <h1 className="text-3xl font-bold mb-24">Vēlies iepozēt?</h1>
            <p className="text-2xl font-medium">
              Aizpildi formu, lai es varu uzzināt vairāk par tavām idejām.
            </p>
          </div>

          <div className="form">
            <div className="inputs mb-8">
              <div className="lg:flex flex-row gap-x-4 mb-8">
                <div className="form-element w-full lg:w-1/2 mb-4 text-start">
                  <label htmlFor="name" className="text-xl font-semibold">
                    Vārds
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="bg-black-10 border border-black-10 text-gray-900 text-sm rounded-lg focus:border-black-100 focus:bg-white-ish w-full p-2.5"
                    placeholder="Jānis Bērziņš"
                    required
                  />
                </div>

                <div className="form-element w-full lg:w-1/2 mb-4 text-start">
                  <label htmlFor="email" className="text-xl font-semibold">
                    Projekta mērķis
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="bg-black-10 border border-black-10 text-gray-900 text-sm rounded-lg focus:border-black-100 focus:bg-white-ish w-full p-2.5"
                    placeholder="Komerciāls video"
                    required
                  />
                </div>
              </div>

              <div className="form-element text-start">
                <label htmlFor="message" className="text-xl font-semibold">
                  Projekta detaļas
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="bg-black-10 border border-black-10 text-gray-900 rounded-lg focus:border-black-100 focus:bg-white-ish p-2.5 w-full text-sm"
                  placeholder="Sveiki! Es vēlētos uzstaisīt privāto foto sesiju. Vai Jūs varat man palīdzēt?"
                  required
                ></textarea>
              </div>
            </div>

            <a id="mailSubmit">
              <button
                className="rounded-full py-3 bg-orange w-full text-center text-white-ish"
                type="submit"
              >
                Nosūtīt ziņu
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
