import { useNavigate, useParams } from "react-router-dom";
import useUserForm, { usePostResponse } from "./hooks/useUserForm";
import FormOptions from "./FormOptions";
import useUserQueries from "../../hooks/useUserQueries";
import { FormEvent } from "react";
import { checkRequired } from "../../util/utils";
import { ulid } from "ulid";

const UserForms = () => {
  const { formId } = useParams();
  const { data } = useUserForm({ formId });
  const { onChangeDataFn, answer } = usePostResponse({ data });
  const navigate = useNavigate();

  const onSubmitForm = async (e: FormEvent) => {
    const { postResponseApi } = useUserQueries();
    e.preventDefault();
    //check로직
    //required이고, array.length가 비어있을 경우 alert
    const checkResult = checkRequired(answer);
    if (!checkResult) return alert("필수값을 입력해주세요");

    const result = await postResponseApi({
      body: answer,
      config: { formId: formId },
    });
    console.log(result);
    if (result.ok) {
      alert("제출 성공");
      navigate("/");
    }
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
                onChangeDataFn={onChangeDataFn}
              />
            ))}
        </article>
      </div>
      <button
        className="btn"
        type="submit"
        style={{ width: "640px" }}
        onClick={() => {
          console.log("제출버튼 클릭");
        }}
      >
        제출
      </button>
    </form>
  );
};

export default UserForms;
