import { OptionTitleProps } from "../../../types/type";

const OptionTitle = ({ option, setOption, handleBlur }: OptionTitleProps) => {
  return (
    <div className="box">
      <input
        className="title"
        type="text"
        placeholder="제목"
        onChange={(e) => {
          const newOption = {
            ...option,
            title: e.target.value,
          };
          setOption(newOption);
          handleBlur({ newOption });
        }}
      />
      <select
        name=""
        id=""
        onChange={(e) => {
          const newOption = {
            ...option,
            type: e.target.value,
          };
          setOption(newOption);
          handleBlur({ newOption });
        }}
      >
        <option value="1">객관식 질문</option>
        <option value="2">체크박스</option>
        <option value="3">단답형</option>
      </select>
    </div>
  );
};

export default OptionTitle;
