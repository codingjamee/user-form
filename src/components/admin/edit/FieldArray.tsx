import { useFieldArray, useForm } from "../../../hook-form/useForm";

/**
 * useFieldArray
 * 사용예시 설정
 */
function FieldArray() {
  const { register } = useForm({ defaultValues: {} });
  const { fields, append, remove } = useFieldArray({
    name: "test", // unique name for your Field Array
  });

  return (
    <>
      {fields.map((field: any, index: number) => (
        <input
          key={field.id} // important to include key with field's id
          {...register(`test.${index}.value`)}
        />
      ))}
    </>
  );
}

export default FieldArray;
