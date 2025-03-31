import Conversation from "../../widgets/Home/Chats/Conversation";
import { useLoading } from "../../features/global/useLoading";
import Loading from "../../features/global/Loading";

const text: string = "Удобный чат для вас и ваших друзей";

export default function Home() {
  const isLoading = useLoading(3000); // 3s loading delay

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="transition duration-200 ease-in-out ">
          <p className="mb-6 border-1 border-black overflow-hidden mt-4 text-center  text-lg text-blue-500/75">
            {Array.from(text).map((char, index) => {
              return (
                <span
                  style={{ animationDelay: String(index / 25) + "s" }}
                  className={`${char == " " ? "" : "inline-block"} relative bottom-8 animate-letter-appear`}
                  key={index}
                >
                  {char}
                </span>
              );
            })}
          </p>
          <Conversation />
        </div>
      )}
    </>
  );
}
