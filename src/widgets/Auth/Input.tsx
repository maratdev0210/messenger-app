import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { useState } from "react";
import { Inputs } from "../../types/auth/inputs";
import Error from "./Error";

interface IField {
  name: keyof Inputs;
  label: string;
  type: string; // text | password
  register: UseFormRegister<Inputs>;
  watch: UseFormWatch<Inputs>;
  errors: FieldErrors<Inputs>;
}

export default function Input({
  name,
  label,
  type,
  register,
  watch,
  errors,
}: IField) {
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  watch(name);

  return (
    <label className="relative" htmlFor={name}>
      <span
        className={`${isEmpty ? "hidden" : "text-black inline-block animate-label-appear text-lg "}`}
      >
        {label}
      </span>

      <input
        onInput={(e) => setIsEmpty(e.target.value.length == 0)}
        className="border-1 focus:outline-blue-300 text-gray-500  border-gray-300 rounded-lg w-full px-2 py-2 placeholder:text-gray-400 placeholder:font-light tracking-wide"
        type={type}
        {...register(name, {
          required: `${label} is required`,
        })}
        placeholder={label}
      />
      <div>{errors[name] && <Error message={errors[name].message} />}</div>
    </label>
  );
}
