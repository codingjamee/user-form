import { FormPageData } from "../../types/type";
import FormOptions from "./FormOptions";

const GetForm = ({ data }: { data?: FormPageData }) => {
  return (
    <div className="app">
      <div className="form">
        <section className="title-section title">
          <div className="edge"></div>
          <div className="zone">
            <div style={{ display: "flex", gap: "20px" }}>
              <div>제목:</div>
              <input
                type="text"
                placeholder="설문지 제목"
                defaultValue={data?.formTitle?.title}
              />
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
              <div>설문지 설명:</div>
              <input
                type="text"
                className="desc"
                placeholder="설문지 설명"
                defaultValue={data?.formTitle?.desc}
              />
            </div>
          </div>
        </section>

        <article
          className="user-section get"
          style={{ display: "flex", gap: "10px" }}
        >
          {data &&
            data?.forms?.map((form, index) => (
              <FormOptions key={form?.id} form={form} />
            ))}
        </article>
      </div>
      <button
        className="btn"
        style={{ width: "640px" }}
        onClick={() => console.log("제출버튼 클릭")}
      >
        제출
      </button>
    </div>
  );
};

export default GetForm;
