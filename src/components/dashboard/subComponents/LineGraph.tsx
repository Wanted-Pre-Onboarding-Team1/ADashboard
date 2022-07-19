import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { WeekContext } from 'libs/context';
import { ReportData } from 'types/dashboard';
import useReportLoad from '../hooks/useReportLoad';

export default function LineGraph() {
  const [report, setReport] = useState<ReportData[]>();
  const { currentWeek } = React.useContext(WeekContext);

  const { totalDataContainingDates: reportData } = useReportLoad(
    currentWeek[0],
    currentWeek[1],
  );
  React.useEffect(() => {
    if (reportData) {
      console.log(reportData);
      setReport(reportData);
    }
  }, [reportData]);

  return (
    <ResponsiveContainer width="100%" height="50%">
      <LineChart
        data={report}
        margin={{
          top: 30,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="1" vertical={false} />
        <XAxis
          dataKey="date"
          stroke="5550bd"
          domain={['dataMin', 'dataMax']}
          padding={{ left: 40, right: 40 }}
        />
        <YAxis />
        <Tooltip />
        <Line
          type="linear"
          dataKey="roas"
          stroke="#596cf6"
          activeDot={{ r: 6 }}
          strokeWidth={2}
        />
        <Line
          type="linear"
          dataKey="click"
          stroke="#85da47"
          activeDot={{ r: 6 }}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}