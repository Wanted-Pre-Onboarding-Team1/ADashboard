import React from 'react';
import styled from 'styled-components';
import { WeekListPropsType } from 'types/dashboard';
import { formatize } from 'components/dashboard/util';

type Timeout = ReturnType<typeof setTimeout>;

export default function WeekList({
  weeksList,
  setWeek,
  isVisible,
  onClick,
}: WeekListPropsType) {
  const [isScrollCaptured, setIsScrollCaptured] = React.useState<boolean>(true);

  const onScrollCapture = React.useCallback(handleScrollCapture, []);

  function handleScrollCapture(event: React.SyntheticEvent): void {
    setIsScrollCaptured(true);
  }

  const onScroll = React.useCallback(handleScroll, []);

  const timer = React.useRef<Timeout | null>(null);
  function handleScroll(event: React.SyntheticEvent): void {
    if (timer.current !== null) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setIsScrollCaptured(false);
    }, 500);
  }

  function handleClick(event: React.SyntheticEvent): void {
    onClick(!isVisible);
  }

  React.useEffect(() => {
    let foo: Timeout | null = null;
    if (isVisible) {
      foo = setTimeout(() => setIsScrollCaptured(false), 500);
    }
    return () => clearTimeout(foo as Timeout);
  }, [isVisible]);

  // 전체 주 목록을 li로 표시, 각 목록을 누를 경우 컨텍스트에 저장될 week state 갱신
  const formattedWeeks = weeksList.map(
    (weekList: string | string[], index: number) => {
      const [firstDate, lastDate] = weekList as string[];
      return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <li key={`${firstDate}_${index}`} onClick={handleClick}>
          {/* 화살표 함수 외에 다른 방법이 있으면 추천좀... */}
          <button onClick={() => setWeek(weekList as string[])} type="button">
            {formatize(firstDate, lastDate)}
          </button>
        </li>
      );
    },
  );

  return (
    <SelectItemsContainer
      isVisible={isVisible}
      isScrollCaptured={isScrollCaptured}
      onScrollCapture={onScrollCapture}
      onScroll={onScroll}
    >
      {formattedWeeks}
    </SelectItemsContainer>
  );
}

const SelectItemsContainer = styled.ul<{
  isVisible: boolean;
  isScrollCaptured: boolean;
}>`
  width: max-content;
  height: 150px;
  position: absolute;
  top: 100%;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  background-color: ${({ theme }) => theme.colors.backgroundColor};
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.lightGrayColor};
    background-color: #c8ced8ad;
    visibility: ${(props) => (props.isScrollCaptured ? 'visible' : 'hidden')};
  }

  li {
    margin: 10px 0;
    padding: 0 10px;

    button {
      margin: 0;
    }
  }
`;
