import { OptionTitleProps } from "../types/type";

const OptionTitle = ({ setUserOption }: OptionTitleProps) => {
  return (
    <div className="box">
      <input
        className="title"
        type="text"
        placeholder="제목"
        onChange={(e) =>
          setUserOption((prev) => ({ ...prev, title: e.target.value }))
        }
      />
      <select
        name=""
        id=""
        onChange={(e) =>
          setUserOption((prev) => ({ ...prev, type: e.target.value }))
        }
      >
        <option value="1">객관식 질문</option>
        <option value="2">체크박스</option>
        <option value="3">드롭다운</option>
      </select>
    </div>
  );
};

export default OptionTitle;
