import Form from "../../widgets/Auth/Form";
import Logo from "../../assets/Logo";

export default function Auth() {
  return (
    <>
      <div className="w-full h-[100vh] flex flex-col justify-center items-center">
        <div>
          <p className="text-2xl font-semibold text-center">
            Добро пожаловать в Messenger
          </p>
          <Logo animate={true} />
        </div>
        <div className="w-full mt-16">
          <Form />
        </div>
      </div>
    </>
  );
}
