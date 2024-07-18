const FormTitle = ({
  setOptionGroup,
}: {
  setOptionGroup: React.Dispatch<
    React.SetStateAction<{
      formTitle: {
        title: string;
        desc: string;
      };
      option1: {
        type: string;
        title: string;
        options: string[];
        required: boolean;
      };
    }>
  >;
}) => {
  return (
    <section className="title-section title">
      <div className="edge"></div>
      <div className="zone">
        <input
          type="text"
          placeholder="설문지 제목"
          onChange={(e) =>
            setOptionGroup((prev) => ({
              ...prev,
              ["formTitle"]: { ...prev.formTitle, title: e.target.value },
            }))
          }
        />
        <input
          type="text"
          className="desc"
          placeholder="설문지 설명"
          onChange={(e) =>
            setOptionGroup((prev) => ({
              ...prev,
              ["formTitle"]: { ...prev.formTitle, desc: e.target.value },
            }))
          }
        />
      </div>
    </section>
  );
};

export default FormTitle;
