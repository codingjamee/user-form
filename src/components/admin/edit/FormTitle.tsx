import { FormTitleProps } from "../../../types/type";

const FormTitle = ({ setOptionGroup }: FormTitleProps) => {
  return (
    <section className="title-section title">
      <div className="edge"></div>
      <div className="zone">
        <input
          type="text"
          placeholder="설문지 제목"
          onBlur={(e) =>
            setOptionGroup((prev) => ({
              ...prev,
              formTitle: { ...prev.formTitle, title: e.target.value },
            }))
          }
        />
        <input
          type="text"
          className="desc"
          placeholder="설문지 설명"
          onBlur={(e) =>
            setOptionGroup((prev) => ({
              ...prev,
              formTitle: { ...prev?.formTitle, desc: e.target.value },
            }))
          }
        />
      </div>
    </section>
  );
};

export default FormTitle;
