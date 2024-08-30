import { ChangeEvent, useContext, useEffect } from "react";
import { FormContext } from "./formContext";
import { ulid } from "ulid";
import cloneDeep from "lodash.clonedeep";

const findTargetValue = ({
  data,
  targetKeys,
}: {
  data: string;
  targetKeys: string[] | string;
}) => {
  if (Array.isArray(targetKeys))
    return targetKeys.reduce((acc, cur) => {
      if (!isNaN(Number(cur))) return acc[Number(cur)];
      return acc[cur];
    }, data);

  return data[targetKeys];
};

const useForm = ({ defaultValues }: { defaultValues?: {} }) => {
  const { data, setData } = useContext(FormContext);

  //초깃값 설정
  useEffect(() => {
    setData(defaultValues);
  }, []);

  const register = (name: string) => {
    // 해당 이름으로 data를 등록

    const keys = name.split("."); //usefieldArray사용시
    const popKeys = [...keys]; //마지막 key를 pop하기 위해 copy
    const poppedKey = popKeys.pop(); //마지막 key를 pop
    const targetKey = findTargetValue({ data, targetKeys: popKeys });

    const registerToData = () => {
      const isThereFormArray = keys.length > 1;

      if (isThereFormArray) {
        const mutatedData = { ...data };

        for (let i = 0; i < keys.length; i++) {
          //등록하고자 하는 key value가 존재하는 경우 return
          const isTherePrevVal = mutatedData[keys[i]];
          if (isTherePrevVal) return;

          //다음 요소가 숫자일때 해당 키의 값은 array
          const nextValue = parseInt(keys[i + 1]) + 1;
          const valueIsArray = !isNaN(nextValue);

          const arrayCount = nextValue;

          if (valueIsArray) {
            mutatedData[keys[i]] = [];
            for (let i = 0; i < arrayCount; i++) {
              mutatedData[keys[i]].push({ id: ulid() });
            }
            return; //{ a: []}
          }
          return (mutatedData[keys[i]] = { id: ulid() });
        }

        setData(mutatedData);
      }
    };

    registerToData();

    return {
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        targetKey[poppedKey] = e.target.value;
      },
      name: poppedKey,
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
