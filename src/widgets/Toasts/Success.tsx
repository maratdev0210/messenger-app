// Success message

interface ISuccess {
  message: string;
}

export default function Success({ message }: ISuccess) {
  return (
    <>
      <div>
        <div className="absolute top-0 z-999 animate-toast-success-appear w-full r flex justify-center">
          <div className="w-60  animate-toast-success-disappear">
            <p className="bg-green-500/75 rounded-xl text-white text-lg text-center py-2 px-1">
              {message}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
