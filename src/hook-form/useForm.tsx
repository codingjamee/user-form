import { ChangeEvent, useContext, useEffect } from "react";
import { FormContext } from "./formContext";
import { ulid } from "ulid";
import cloneDeep from "lodash.clonedeep";

const splitKeyWithDot = ({ key }: { key: string }) => {
  return key.split(".");
};

const determineNestedArray = ({ key }: { key: string }) => {
  const keyArr = splitKeyWithDot({ key });
  return keyArr.length > 1;
};

const getNestedKeyExceptLast = ({ targetKeys, newValue }) => {
  const isNested = determineNestedArray({ key: targetKeys });
  if (!isNested) return;

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

/**
 *  반드시 string으로 시작해서 string으로 끝나야함.
 *  string 다음에 string이 존재하지 않음.
 *  number 다음에 number도 존재하지 않음.
 */
const validateFormKey = ({ key }: { key: string }) => {
  const keyArr = splitKeyWithDot({ key });
  if (
    keyArr.length < 1 ||
    typeof keyArr[0] !== "string" ||
    typeof keyArr[keyArr.length - 1] !== "string"
  )
    return false;

  for (let i = 0; i < keyArr.length; i++) {
    const isOdd = i % 2 !== 0;
    const isEven = i % 2 === 0;
    if (isEven) {
      //짝수는 string
      //빈문자열 이거나 숫자이면 false
      if (keyArr[i] === "" || !isNaN(Number(keyArr[i]))) {
        return false;
      }
    }
    if (isOdd) {
      if (isNaN(Number(keyArr[i]))) {
        return false;
      }
    }
  }

  return true;
};

const useForm = (defaultValues: {}) => {
  const { data, setData } = useContext(FormContext);

  //초깃값 설정
  useEffect(() => {
    setData(defaultValues);
  }, []);

  /**
   *register함수 설명 :
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

    const isNestedArray = determineNestedArray({ key: name });

    const { lastKey } = isNestedArray
      ? getNestedKeyExceptLast({
          targetKeys: name,
          newValue: data,
        })
      : { lastKey: name };

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
      name: isNestedArray ? lastKey : name,
      value: isNestedArray
        ? getNestedValue({ data, targetKeys: name })
        : getValue({ data, targetKey: name }),
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
