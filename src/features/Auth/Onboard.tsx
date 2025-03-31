/* 'Landing' type form, when the user first opens the website */

import { useForm, SubmitHandler } from "react-hook-form";
import { Inputs } from "../../types/auth/inputs";
import Input from "../../widgets/Auth/Input";
import { useNavigate } from "react-router-dom";
import { LoginFields } from "../../types/auth/login";

export default function Onboard() {
  const navigate = useNavigate();
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
        className="flex cursor-pointer flex-col px-2 gap-2 md:w-1/2 lg:w-1/3 2xl:w-90 md:mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        {LoginFields.map((field, index) => {
          return (
            <Input
              key={index}
              name={field.name}
              label={field.label}
              type={field.label}
              register={register}
              watch={watch}
            />
          );
        })}
        <input
          type="submit"
          value="Войти"
          className="border-1 w-full rounded-lg mt-4 py-1.5 text-white  bg-blue-600 saturate-200 cursor-pointer"
        />
      </form>
      <div className="px-2 md:px-4 lg:px-6 2xl:w-90 2xl:px-2 2xl:mx-auto flex justify-center">
        <button
          onClick={() => navigate("/auth/signup")}
          className="w-full md:w-1/2 lg:w-1/3 2xl:w-90 rounded-lg bg-gray-200 py-1.5 mt-2 text-gray-700 font-semibold cursor-pointer hover:transition hover:bg-gray-200/75 hover:duration-200"
        >
          Создать новый аккаунт
        </button>
      </div>
    </>
  );
}
