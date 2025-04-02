import Loading from "../../../features/global/Loading";

export default function EmptyChat() {
  return (
    <>
      <div className="flex-1 relative flex-col md:bg-[#1c1d25] md:flex justify-center items-center hidden duration-1000 transition">
        <div className="mb-20 text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 lg:text-4xl text-3xl transition duration-300 text-center">
          <h3>
            Hi<span className="text-blue-500 inline-block mr-1">!</span>
            Welcome to <span className="text-blue-500">Messenger</span>{" "}
            <span>App</span>
          </h3>
        </div>
        <div className="mt-24">
          <Loading />
        </div>
      </div>
    </>
  );
}
