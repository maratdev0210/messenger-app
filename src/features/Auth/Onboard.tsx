/* 'Landing' type form, when the user first opens the website */

import { useForm, SubmitHandler } from "react-hook-form";
import { Inputs } from "../../types/auth/inputs";
import Input from "../../widgets/Auth/Input";

export default function Onboard() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <>
      <form
        className="flex flex-col px-2 gap-2 md:w-1/2 lg:w-1/3 2xl:w-90 md:mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          name="username"
          label="Username"
          type="text"
          register={register}
          watch={watch}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          register={register}
          watch={watch}
        />
        <input
          type="submit"
          value="Войти"
          className="border-1 w-full rounded-lg mt-4 py-1.5 text-white  bg-blue-600 saturate-200 cursor-pointer"
        />
      </form>
      <div className="px-2 md:px-4 lg:px-6 2xl:w-90 2xl:px-2 2xl:mx-auto flex justify-center">
        <button className="w-full md:w-1/2 lg:w-1/3 2xl:w-90 rounded-lg bg-gray-200 py-1.5 mt-2 text-gray-700 font-semibold">
          Создать новый аккаунт
        </button>
      </div>
    </>
  );
}
