interface IUserData {
  userData: string;
  profileColor: string;
  label: string;
}

export default function UserData({ userData, label, profileColor }: IUserData) {
  return (
    <div className="-mb-1 w-3/4 mx-auto p-0">
      <label>
        <span className="text-blue-500 text-sm font-semibold">{label}</span>
        <input
          className="text-center w-2/3 text-black/95 text-lg rounded-lg"
          readOnly
          type="text"
          value={userData}
        />
      </label>
    </div>
  );
}
