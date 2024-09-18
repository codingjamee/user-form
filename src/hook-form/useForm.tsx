import { ChangeEvent, useContext, useEffect } from "react";
import { FormContext } from "./formContext";
import { ulid } from "ulid";
import cloneDeep from "lodash.clonedeep";

const splitKeyWithDot = ({ key }: { key: string }) => {
  return key.split(".");
};

const determineNestedArray = ({ key }: { key: string }) => {
  const keyArr = splitKeyWithDot({ key });
  console.log("determineNestedArray", keyArr.length > 1);
  return keyArr.length > 1;
};

const getNestedValue = ({ data, targetKeys }) => {
  const targetKeyArr = splitKeyWithDot({ key: targetKeys });

  return targetKeyArr.reduce((acc, cur) => {
    // console.log("getNestedValue", { data, acc, cur });
    if (acc === undefined || cur === undefined) return undefined;
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
const initializeNestedKey = ({ newValue, targetKeys }) => {
  const initialLizeObj = { ...newValue };
  const targetKeyArr = splitKeyWithDot({ key: targetKeys });

  return targetKeyArr.reduce((acc, key, index) => {
    const isNumeric = !isNaN(Number(key));

    if (!acc[key]) {
      if (!isNumeric) {
        //이미 유효한 key로 가정 (string일때는 다음은 number 혹은 없음)
        if (!isNaN(Number(targetKeyArr[index + 1]))) {
          acc[key] = []; //data = {test: []}
        } else {
          acc[key] = {};
        }
      }
      if (isNumeric) {
        //숫자이면 acc[key] = [] 로 놓았을 경우
        //test[0] = []이 되므로 안됨
        //test[0] = {} 는 이전에 test가 []로 설정되어야 함 위의 조건문
        //test[0] = {}
        acc[Number(key)] = {};
      }
    }
    return isNumeric ? acc[Number(key)] : acc[key];
  }, initialLizeObj);
};

const getNestedKeyExceptLast = ({ targetKeys, newValue }) => {
  console.log("getNestedKeyExceptLast", { targetKeys, newValue });
  const isNested = determineNestedArray({ key: targetKeys });
  if (!isNested) return { nestedKeyExceptLast: newValue, lastKey: targetKeys };

  const targetKeyArr = splitKeyWithDot({ key: targetKeys });
  const lastKey = targetKeyArr[targetKeyArr.length - 1];
  console.log("99line", targetKeyArr.slice(0, -1));

  const nestedKeyExceptLast = targetKeyArr
    .slice(0, -1)
    .reduce((acc, cur, index) => {
      if (typeof acc !== "object" || acc === null) {
        // If acc is not an object (including when it's a string), initialize it as an object
        return isNaN(Number(cur)) ? {} : [];
      }

      if (!(cur in acc)) {
        const nextKey = targetKeyArr[index + 1];
        acc[cur] = isNaN(Number(nextKey)) ? {} : [];
      }

      return acc[cur];
    }, newValue);

  return { nestedKeyExceptLast, lastKey };
};

const setNestedValue = ({ setData, targetKeys, value }) => {
  console.log("setNestedValue", { setData, targetKeys, value });
  setData((prev) => {
    console.log("prev===============", prev);
    const newValue = { ...prev };
    console.log("About to call initializeNestedKey");

    const initializedObj = initializeNestedKey({ newValue, targetKeys });
    console.log("initializedObj", initializedObj);
    const { nestedKeyExceptLast, lastKey } = getNestedKeyExceptLast({
      targetKeys,
      newValue: initializedObj,
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

const useForm = (defaultValues: {}) => {
  const { data, setData } = useContext(FormContext);

  //초깃값 설정
  useEffect(() => {
    console.log("defaultValues", defaultValues);
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
    const isValidKey = validateFormKey({ key: name });
    if (!isValidKey) {
      return { validationResult: { isValid: false, error: "not valid key" } };
    }

    const isNestedArray = determineNestedArray({ key: name });

    // 초기 등록
    setData((prevData) => {
      const newData = { ...prevData };
      const keysArr = splitKeyWithDot({ key: name });
      let current = newData;
      for (let i = 0; i < keysArr.length - 1; i++) {
        if (!(keysArr[i] in current)) {
          current[keysArr[i]] = isNaN(Number(keysArr[i + 1])) ? {} : [];
        }
        current = current[keysArr[i]];
      }
      if (current[keysArr[keysArr.length - 1]] === undefined) {
        current[keysArr[keysArr.length - 1]] = "";
      }
      return newData;
    });

    return {
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        setData((prevData) => {
          const newData = { ...prevData };
          console.log("newData", { newData });
          const keysArr = splitKeyWithDot({ key: name });
          let current = newData;
          for (let i = 0; i < keysArr.length - 1; i++) {
            current = current[keysArr[i]];
          }
          current[keysArr[keysArr.length - 1]] = e.target.value;
          return newData;
        });
      },
      name: name.split(".").pop(),
      get value() {
        return getNestedValue({ data, targetKeys: name });
      },
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
