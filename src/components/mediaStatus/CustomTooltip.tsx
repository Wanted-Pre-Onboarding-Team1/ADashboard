import React from 'react';
import styled from 'styled-components';

// 데이터 타입 any 문제
function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const { total } = payload[0].payload;
    const format = (data: number) => {
      return Math.round(data).toLocaleString();
    };

    return <ToolTip>{`${format(total)}`}</ToolTip>;
  }

  return null;
}

export default CustomTooltip;

const ToolTip = styled.strong`
  position: absolute;
  left: 50%;
  display: block;
  padding: 16px 32px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.fontColor};
  color: ${({ theme }) => theme.colors.whiteColor};
  // bar 차트 너비의 절반(20px) 만큼 오른쪽으로 이동 추가
  transform: translateX(-50%) translateX(20px);

  &:after {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 15px 15px 0;
    border-color: ${({ theme }) => theme.colors.fontColor} transparent;
    display: block;
    width: 0;
    z-index: 1;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
  }
`;
