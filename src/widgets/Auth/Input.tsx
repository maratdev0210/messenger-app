import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { useState } from "react";
import { Inputs } from "../../types/auth/inputs";

interface IField {
  name: keyof Inputs;
  label: string;
  type: string; // text | password
  register: UseFormRegister<Inputs>;
  watch: UseFormWatch<Inputs>;
}

export default function Input({ name, label, type, register, watch }: IField) {
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  watch(name);

  return (
    <label htmlFor={name}>
      <span
        className={`${isEmpty ? "hidden" : "text-black inline-block animate-label-appear text-lg "}`}
      >
        {label}
      </span>

      <input
        onInput={(e) => setIsEmpty(e.target.value.length == 0)}
        className="border-1 focus:outline-blue-300 text-gray-500  border-gray-300 rounded-lg w-full px-2 py-2 placeholder:text-gray-400 placeholder:font-light tracking-wide"
        type={type}
        {...register(name)}
        placeholder={label}
      />
    </label>
  );
}
