interface IProfileColor {
  color: string;
  profileColor: string;
  setProfileColor: React.Dispatch<React.SetStateAction<string>>;
}

export default function ProfileColor({
  color,
  profileColor,
  setProfileColor,
}: IProfileColor) {
  return (
    <>
      <div
        onClick={() => setProfileColor(color)}
        className={`${color} ${profileColor === color ? "scale-125 transition duration-200 ease-in-out" : ""} cursor-pointer rounded-full size-6`}
      ></div>
    </>
  );
}
