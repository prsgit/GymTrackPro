import { useState } from "react";

const useForm = (initialObject = {}) => {
  const [form, setForm] = useState(initialObject);

  const changed = ({ target }) => {
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  return {
    form,
    changed,
  };
};

export default useForm;
