import { FormsData } from "../../types/type";

const FormOptions = ({ form }: { form: FormsData }) => {
  return (
    <>
      <div className="box" style={{ display: "flex" }}>
        <div>{form.title}</div>
      </div>
      <section className="options" key={form?.id}>
        {form.asks.map((ask) => (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <input type="checkbox" id={ask.id} style={{ width: "20px" }} />
            <label htmlFor={ask.id} style={{ flex: 1 }}>
              {ask.title}
            </label>
          </div>
        ))}
      </section>
      {form.required && <div>"필수로 입력해주세요"</div>}
    </>
  );
};

export default FormOptions;
