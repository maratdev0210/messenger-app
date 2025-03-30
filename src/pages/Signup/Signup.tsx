import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../../widgets/Auth/Input";
import { Inputs } from "../../types/auth/inputs";
import { SignupFields } from "../../types/auth/signup";
import Logo from "../../assets/Logo";

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <>
      <div className="h-[100vh] flex flex-col justify-center">
        <div>
          <p className="text-center text-xl  text-blue-600 font-semibold">
            Создайте аккаунт, чтобы начать общаться
          </p>
          <Logo animate={true} />
        </div>
        <form
          className="flex  mt-8 flex-col px-2 gap-2 md:w-1/2 lg:w-1/3 2xl:w-90 md:mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          {SignupFields.map((field, index) => {
            return (
              <Input
                key={index}
                name={field.name}
                label={field.label}
                type={field.type}
                register={register}
                watch={watch}
              />
            );
          })}
          <input
            type="submit"
            value="Создать аккаунт"
            className="border-1 w-full rounded-lg mt-4 py-1.5 text-white  bg-blue-600 saturate-200 cursor-pointer"
          />
        </form>
      </div>
    </>
  );
}
