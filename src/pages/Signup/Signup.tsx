import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../../widgets/Auth/Input";
import { Inputs } from "../../types/auth/inputs";
import { SignupFields } from "../../types/auth/signup";
import Logo from "../../assets/Logo";
import { apiClient } from "../../lib/apiClient";
import { SIGNUP_ROUTE } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/store";

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await apiClient.post(
        SIGNUP_ROUTE,
        {
          username: data.username,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status == 200) {
        setUserInfo(response.data.user);
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="sm:absolute sm:-translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2 w-full sm:top-1/2 md:w-1/2 lg:w-1/3 2xl:w-90">
        <div className="flex  flex-col justify-center">
          <div>
            <p className="text-center text-xl  text-blue-600 font-semibold">
              Создайте аккаунт, чтобы начать общаться
            </p>
            <Logo animate={true} />
          </div>
          <form
            className="flex  mt-8 flex-col px-2 gap-2 md:mx-auto w-full"
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
                  errors={errors}
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
      </div>
    </>
  );
}
