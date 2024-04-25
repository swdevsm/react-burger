import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

export default function useForm<T>(
  inputValues: T | (() => T)
): [
  value: T,
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
  setValues: Dispatch<SetStateAction<T>>
] {
  const [values, setValues] = useState<T>(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  return [values, handleChange, setValues];
}
