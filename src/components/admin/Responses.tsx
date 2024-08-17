import { useParams } from "react-router-dom";
import useResponses from "./hooks/useResponses";
import MyPieChart from "../common/MyPieChart";
import styles from "./responses.module.css";

const Responses = () => {
  //응답이 오면 보여주기

  const { formId } = useParams();
  // console.log(formId);
  const { summary } = useResponses({ formId });

  // console.log(summary?.data?.responses);

  return (
    <div className={styles.wrapper}>
      <h1 className={`${styles["response-count"]}`}>
        응답 갯수 : {summary?.data?.responseCount}
      </h1>
      <div className={styles.responses}>
        {summary && summary?.data?.responses.length > 0 ? (
          <div className={styles.response}>
            <h2 style={{ fontSize: "22px" }}>{summary?.data?.title}</h2>

            {summary?.data?.responses?.map((response) => (
              <div className={styles["response-box"]}>
                <MyPieChart data={response} />
              </div>
            ))}
          </div>
        ) : (
          <div>아직 응답 데이터가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default Responses;
