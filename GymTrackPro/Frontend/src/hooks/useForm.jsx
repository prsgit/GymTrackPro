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

  const resetForm = () => {
    setForm(initialObject);
  };

  return {
    form,
    changed,
    resetForm,
  };
};

export default useForm;
