import { PureComponent } from "react";
import {
  Bar,
  LabelList,
  ComposedChart,
  Line,
  XAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MonthData } from "../utils/fetch/monthData";
// import styled from "styled-components";

interface IBarChartProps {
  data: MonthData[];
  onSelection: any;
}

export default class ExpensesChart extends PureComponent<IBarChartProps> {
  render() {
    const { data, onSelection } = this.props;
    return (
      <ResponsiveContainer className="bar-chart grid-item big-size">
        <ComposedChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 30,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="month" />
          {/* <YAxis /> */}
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#fe0000" onClick={onSelection}>
            <LabelList dataKey="amount" position="top" fill="black" />
          </Bar>
          <Bar dataKey="income" fill="#82ca9d" onClick={onSelection}>
            <LabelList dataKey="income" position="top" fill="black" />
          </Bar>
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#fe0000"
            legendType="none"
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#82ca9d"
            legendType="none"
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}
