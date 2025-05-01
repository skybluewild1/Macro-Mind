// PieChartMacro.js
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ["#8BC34A", "#FF9800", "#FFCE56"];
const GRAY_COLORS = ["#ccc", "#ccc", "#ccc"];

export default function PieChartMacro({ macros }) {
  const total = macros.protein + macros.carbs + macros.fat;
  const hasData = total > 0;

  const data = hasData
    ? [
        { name: "Protein", value: macros.protein },
        { name: "Carbs", value: macros.carbs },
        { name: "Fat", value: macros.fat },
      ]
    : [
        { name: "Protein (20%)", value: 20 },
        { name: "Carbs (50%)", value: 50 },
        { name: "Fat (30%)", value: 30 },
      ];

  return (
    
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
        >
          {(hasData ? COLORS : GRAY_COLORS).map((color, index) => (
            <Cell key={`cell-${index}`} fill={color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
