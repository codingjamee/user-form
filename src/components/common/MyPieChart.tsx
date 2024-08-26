import { Cell, Legend, Pie, PieChart } from "recharts";
import { ResponseData } from "../../types/type";
import { PieLabelRenderProps } from "recharts";

interface CustomLabelProps extends PieLabelRenderProps {
  index: number;
}

const MyPieChart = ({ data }: { data: ResponseData }) => {
  const COLORS = [
    "#a85d87",
    "#ffa3a7",
    "#a3a7ff",
    "#cda3ff",
    "#a3d5ff",
    "#ffcda3",
    "#d5ffa3",
  ];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    index,
  }: CustomLabelProps) => {
    if (percent === 0) return null;
    const RADIAN = Math.PI / 180;
    const radius = (outerRadius as number) + 1;
    const x = Number(cx) + radius * Math.cos(-midAngle * RADIAN);
    const y = Number(cy) + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > Number(cx) ? "start" : "end"}
        dominantBaseline="central"
        fontSize={14}
      >
        {`${data.answers[index].name}: ${(Number(percent) * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <div>{data.title}</div>
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PieChart width={500} height={300}>
          <Pie
            data={data.answers}
            cx={150}
            cy={150}
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={renderCustomizedLabel}
          >
            {data.answers.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            wrapperStyle={{ paddingLeft: 40 }}
          />
        </PieChart>
      </div>
    </>
  );
};

export default MyPieChart;
