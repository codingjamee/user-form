interface Props {
  urlToCopy: string;
}

const copyClipboard = ({ urlToCopy }: Props) => {
  navigator.clipboard
    .writeText(urlToCopy)
    .then(() => {
      alert("URL이 클립보드에 복사되었습니다!");
    })
    .catch((err) => {
      console.error("복사에 실패했습니다:", err);
    });
};

export default copyClipboard;
