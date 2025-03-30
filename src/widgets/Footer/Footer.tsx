import { Socials } from "../../types/footer/footer";

export default function Footer() {
  return (
    <>
      <div>
        <div className="px-4 bg-black w-full h-auto mt-20">
          <div className="h-[10vh] py-4 flex gap-4">
            <div>
              <a
                className="text-gray-100 font-semibold text-sm"
                href={Socials[0]}
              >
                Репозиторий на Github
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
