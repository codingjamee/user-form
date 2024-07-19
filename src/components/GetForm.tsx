const GetForm = ({ data }: { data: any }) => {
  return (
    <div className="app">
      <div className="form">
        <section className="title-section title">
          <div className="edge"></div>
          <div className="zone">
            <input
              type="text"
              placeholder="설문지 제목"
              defaultValue={data?.formTitle.title}
            />
            <input
              type="text"
              className="desc"
              placeholder="설문지 설명"
              defaultValue={data?.formTitle?.desc}
            />
          </div>
        </section>
        <div style={{ display: "flex", gap: "10px" }}>
          <article className="user-section">
            <div className="box">
              <input
                className="title"
                type="text"
                placeholder="제목"
                defaultValue={data?.[`option1`]?.title}
              />
              <select
                name=""
                id=""
                defaultValue={parseInt(data?.option1?.type)}
              >
                <option value="1">객관식 질문</option>
                <option value="2">체크박스</option>
                <option value="3">드롭다운</option>
              </select>
            </div>

            {data &&
              Object.entries(data).map((_, index) => (
                <section className="options">
                  <input
                    type="text"
                    placeholder={`옵션 ${index + 1}`}
                    defaultValue={
                      data?.[`option${index + 1}`]?.options?.userOption1
                    }
                  />
                  <div>x</div>
                </section>
              ))}
            <section className="add">
              <div></div>
              <div className="txt">옵션 추가</div>
              <div></div>
            </section>

            <section style={{ fontSize: "14px", color: "gray" }}>
              Is Required?
              <input type="checkbox" checked={data?.[`option1`]?.required} />
            </section>
          </article>
        </div>
      </div>
    </div>
  );
};

export default GetForm;
