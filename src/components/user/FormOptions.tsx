import { FormAnswer, FormsData } from "../../types/type";
import { getInputType } from "../../util/utils";
import styles from "./FormOptions.module.css";

const FormOptions = ({
  form,
  setGroupOption,
}: {
  form: FormsData;
  setGroupOption: React.Dispatch<React.SetStateAction<FormAnswer | undefined>>;
}) => {
  return (
    <div className={styles["options-wrapper"]}>
      <div className={`box ${styles["title-wrapper"]}`}>
        <div>{form.title}</div>
        {form.required && (
          <div className={styles["required"]}>"필수로 입력해주세요"</div>
        )}
      </div>
      <section className={styles["options"]} key={form?.id}>
        {form.asks.map((ask) => (
          <div className={styles["ask"]} key={ask?.id}>
            <input
              className={styles["input"]}
              type={getInputType({ type: form.type })}
              id={ask.id}
              onChange={() => {
                // setGroupOption((prev) => ({
                //   ...prev,
                //   questionId: ask.id,
                //   responses: { ...prev.responses },
                // }));
              }}
            />
            <label className={styles["label"]} htmlFor={ask.id}>
              {ask.title}
            </label>
          </div>
        ))}
      </section>
    </div>
  );
};

export default FormOptions;
