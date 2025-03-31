// Spinning loading animation

export default function Loading() {
  return (
    <>
      <div className="w-full flex justify-center gap-2 items-center h-24 absolute -translate-x-1/2 left-1/2 -translate-y-1/2 top-1/2">
        <div className="size-2 animate-first-dot rounded-full bg-indigo-500"></div>
        <div className="size-2 animate-second-dot rounded-full bg-blue-500"></div>
        <div className="size-2 animate-third-dot rounded-full bg-emerald-500"></div>
      </div>
    </>
  );
}
