import { ChangeEvent, useContext, useEffect } from "react";
import { FormContext } from "./formContext";
import { ulid } from "ulid";
import cloneDeep from "lodash.clonedeep";

const splitKeyWithDot = ({ key }: { key: string }) => {
  return key.split(".");
};

const getNestedKeyExceptLast = ({ targetKeys, newValue }) => {
  const targetKeyArr = splitKeyWithDot({ key: targetKeys });
  const lastKey = targetKeyArr[targetKeyArr.length - 1];
  return targetKeyArr.slice(0, -1).reduce((acc, cur) => {
    if (!acc[cur] || typeof acc[cur] !== "object") {
      acc[cur] = {};
    }
    return { nestedKeyExceptLast: acc[cur], lastKey };
  }, newValue);
};

const setNestedValue = ({ setData, targetKeys, value }) => {
  setData((prev) => {
    const newValue = { ...prev };
    const { nestedKeyExceptLast, lastKey } = getNestedKeyExceptLast({
      targetKeys,
      newValue,
    });
    return (nestedKeyExceptLast[lastKey] = value);
  });
};

const setValue = ({ setData, targetKey, value }) => {
  setData((prev) => ({
    ...prev,
    [targetKey]: value,
  }));
};

const getNestedValue = ({ data, targetKeys }) => {
  const targetKeyArr = splitKeyWithDot({ key: targetKeys });

  return targetKeyArr.reduce((acc, cur) => {
    if (!isNaN(Number(cur))) return acc[Number(cur)];
    return acc[cur];
  }, data);
};

const getValue = ({ data, targetKey }) => {
  return data[targetKey];
};

const determineNestedArray = ({ key }: { key: string }) => {
  //key를 그대로 줄 것인가? splited된 것으로 줄것인가?
  // const isArray = Array.isArray(target);
  // return isArray ? "array" : "string";
  return true;
};

const validateFormKey = ({ key }: { key: string }) => {
  /**
   *  반드시 string으로 시작해서 string으로 끝나야함.
   *  string 다음에 string이 존재하지 않음.
   *  number 다음에 number도 존재하지 않음.
   */

  return {};
};

const findTargetValue = ({
  data,
  targetKeys,
}: {
  data: string;
  targetKeys?: string[] | string;
}) => {
  determineNestedArray(targetKeys);
  if (Array.isArray(targetKeys)) return getNestedValue({ data, targetKeys });
  //만약 array가 아니라면
  return data[targetKeys];
};

const useForm = ({ defaultValues }: { defaultValues?: {} }) => {
  const { data, setData } = useContext(FormContext);

  //초깃값 설정
  useEffect(() => {
    setData(defaultValues);
  }, []);

  /**
   *  register함수 설명 :
   *  data를 등록하는 함수,
   *  return한 함수 onChange와 name, value는
   *  전달한 name에 대한 함수
   *
   *  매개변수로 받은 name (type string)을 key로 활용한다.
   *  nested되어있는 경우 key가 숫자와 string이 .을 기점으로 번갈아가며 존재
   *  규칙 :
   *  반드시 string으로 시작해서 string으로 끝나야함.
   *  string 다음에 string이 존재하지 않음.
   *  number 다음에 number도 존재하지 않음.
   */

  /**
   *
   * @param name
   * @returns onChange, name, value
   */
  const register = (
    name: string
  ): {
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    name?: string | string[];
    value?: any;
    validationResult: { isValid: boolean; error: string };
  } => {
    // 해당 이름으로 data를 등록

    const isValidKey = validateFormKey({ key: name });

    if (!isValidKey)
      return { validationResult: { isValid: false, error: "not valid key" } };

    const keys = name.split("."); //usefieldArray사용시
    const popKeys = [...keys]; //마지막 key를 pop하기 위해 copy
    const poppedKey =
      Array.isArray(popKeys) && popKeys.length > 1 ? popKeys.pop() : undefined; //마지막 key를 pop
    const targetKey = findTargetValue({ data, targetKeys: popKeys });

    const isNestedArray = determineNestedArray({ key: name });
    return {
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        if (isNestedArray) {
          return setNestedValue({
            setData,
            targetKeys: name,
            value: e.target.value,
          }); //nestedValue를 등록
        }
        return setValue({ targetKey: name, value: e.target.value, setData });
      },
      name: poppedKey,
      value: isNestedArray
        ? getNestedValue({ data, targetKeys: name })
        : getValue({ data, targetKey }),
      validationResult: { isValid: true, error: "" },
    };
  };

  const handleSubmit = (submitFn: (data: any) => {}) => {
    if (submitFn) {
      return submitFn(data);
    }
  };

  return { register, handleSubmit };
};

const useFieldArray = ({ name }: { name: string }) => {
  const { data, setData } = useContext(FormContext);

  const nameArray = name.split(".");
  const nameIsInArray = nameArray.length > 1;
  const targetKeys = nameIsInArray ? nameArray.slice(0, -2) : nameArray;

  const foundValue = findTargetValue({
    data,
    targetKeys,
  });

  const getFields = () => {
    return foundValue;
  };

  const fields = getFields();

  //TODO: defaultValues 등록해보기
  function append(defaultValues: {}) {
    const mutateFoundValue = cloneDeep(foundValue);
    if (Array.isArray(foundValue)) {
      mutateFoundValue.push({ id: ulid() });
    }
    setData();
  }
  const remove = () => {};
  return { fields, append, remove };
};

export { useForm, useFieldArray };
