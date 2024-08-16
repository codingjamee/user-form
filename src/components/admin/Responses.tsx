import { useParams } from "react-router-dom";
import useResponses from "./hooks/useResponses";

const Responses = () => {
  //응답이 오면 보여주기

  const { summary, formId } = useParams();
  console.log(formId);
  useResponses({ formId });

  console.log(summary);

  return (
    <div style={{ flex: 1 }}>
      <div>응답 {}</div>
    </div>
  );
};

export default Responses;

/**
 * 질문 title
 * 응답 갯수
 * 옵션에 대한 갯수
 *
 */
