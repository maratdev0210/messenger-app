/* This error is shown when the user auth fails */

interface IToastError {
  message: string;
}

export default function ToastError({ message }: IToastError) {
  return (
    <>
      <div className="w-60 bg-red-50 flex justify-center items-center animate-toast-error-appear fixed bottom-0 z-1000 h-12">
        <p className="text-red-600 relative animate-toast-error-disappear text-lg">
          {message}
        </p>
      </div>
    </>
  );
}
