import { Socials } from "../../types/footer/footer";

export default function Footer() {
  return (
    <>
      <div className="mt-24">
        <div className="px-4 fixed  bottom-0 bg-white shadow-2xl w-full h-auto">
          <div className="h-12 py-4 flex gap-4">
            <div>
              <a className="text-black font-semibold text-sm" href={Socials[0]}>
                Репозиторий на Github
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
