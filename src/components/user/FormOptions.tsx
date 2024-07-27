import { FormsData } from "../../types/type";
import styles from "./FormOptions.module.css";

const FormOptions = ({ form }: { form: FormsData }) => {
  console.log(form);
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
            <input className={styles["input"]} type="checkbox" id={ask.id} />
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
