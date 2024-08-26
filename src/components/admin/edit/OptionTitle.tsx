import { FormsData, OptionTitleProps } from "../../../types/type";

const OptionTitle = ({
  option,
  setOption,
  updateOptionGroup,
}: OptionTitleProps) => {
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
          updateOptionGroup({ newOption });
        }}
      />
      <select
        name=""
        id=""
        onChange={(e) => {
          const newOption: FormsData = {
            ...option,
            type: e.target.value as "text" | "checkbox" | "radio",
          };
          setOption(newOption);
          updateOptionGroup({ newOption });
        }}
      >
        <option value="radio">객관식 질문</option>
        <option value="checkbox">체크박스</option>
        <option value="text">단답형</option>
      </select>
    </div>
  );
};

export default OptionTitle;
