import { useParams } from "react-router-dom";
import useUserForm, { usePostResponse } from "./hooks/useUserForm";
import FormOptions from "./FormOptions";
import useUserQueries from "../../hooks/useUserQueries";

const UserForms = () => {
  const { formId } = useParams();
  const { data } = useUserForm({ formId });
  const { groupOption, setGroupOption } = usePostResponse({ formId });

  const onSubmitForm = async () => {
    const { postResponseApi } = useUserQueries();
    await postResponseApi({ body: groupOption });
  };

  return (
    <form className="app" onSubmit={onSubmitForm}>
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
          style={{ display: "flex", gap: "30px" }}
        >
          {data &&
            data?.forms?.map((form) => (
              <FormOptions
                key={form?.id}
                form={form}
                setGroupOption={setGroupOption}
              />
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
    </form>
  );
};

export default UserForms;
