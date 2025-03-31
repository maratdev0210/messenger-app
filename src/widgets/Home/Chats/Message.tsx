import ProfilePicture from "../../../assets/profile.png";

interface IMessage {
  sentByMe: boolean; // was the message sent by me or by another person.
  message: string;
}

export default function Message({ sentByMe, message }: IMessage) {
  return (
    <>
      <div className={`${sentByMe ? "justify-end" : ""} flex gap-1.5`}>
        {!sentByMe && (
          <div className="flex items-end">
            <img src={ProfilePicture} className="size-6 rounded-full" />
          </div>
        )}
        <div
          className={`${sentByMe ? "bg-blue-500" : "bg-gray-200"} px-3 flex items-center h-8  w-48 rounded-2xl `}
        >
          <p className={`${sentByMe ? "text-white" : "text-gray-500"} text-sm`}>
            {message}
          </p>
        </div>
      </div>
    </>
  );
}
