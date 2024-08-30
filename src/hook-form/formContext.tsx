import { createContext, useState } from "react";

const FormContext = createContext<any>(null);

const FormProvider = ({ children }: { children: any }) => {
  const [data, setData] = useState();
  const [fields, setFields] = useState();

  return (
    <FormContext.Provider value={{ data, setData }}>
      {children}
    </FormContext.Provider>
  );
};

export { FormContext, FormProvider };
