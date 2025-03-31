import { X } from "lucide-react";

interface IError {
  message: string | undefined;
}

export default function Error({ message }: IError) {
  return (
    <>
      <div className="absolute translate-x-0 mt-2 top-0 right-2">
        <span className="bg-red-500  text-white inline-block rounded-full p-0.5">
          <X size={18} />
        </span>
      </div>
      <span className="text-red-500 text-sm">{message}</span>
    </>
  );
}
