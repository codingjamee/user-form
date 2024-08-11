import { FormsAnswerData, FormsData } from "../../types/type";
import { getInputType } from "../../util/utils";
import styles from "./FormOptions.module.css";

const FormOptions = ({
  form,
  onChangeDataFn,
}: {
  form: FormsData;
  onChangeDataFn: ({
    type,
    value,
    dataId,
    formId,
  }: {
    type: "1" | "2" | "3";
    value: string;
    dataId: string;
    formId: string;
  }) => void;
}) => {
  return (
    <div className={styles["options-wrapper"]}>
      <div className={`box ${styles["title-wrapper"]}`}>
        <div>{form.title}</div>
        {form.required && (
          <div className={styles["required"]}>"필수로 입력해주세요"</div>
        )}
      </div>
      {form.asks.map((ask, index) => (
        <section className={styles["options"]} key={`options-${index}`}>
          <div className={styles["ask"]} key={ask?.id}>
            <input
              className={`${styles["input"]} ${
                getInputType({ type: form.type }) === "text" && styles["text"]
              }`}
              type={getInputType({ type: form.type })}
              id={ask.id}
              name={
                getInputType({ type: form.type }) === "radio"
                  ? form.id
                  : undefined
              }
              onChange={(e) => {
                onChangeDataFn({
                  type: form.type,
                  value: e.target.value,
                  formId: form.id,
                  dataId: e.target.id,
                });
              }}
            />

            <label className={styles["label"]} htmlFor={ask.id}>
              {ask.title}
            </label>
          </div>
        </section>
      ))}
    </div>
  );
};

export default FormOptions;
