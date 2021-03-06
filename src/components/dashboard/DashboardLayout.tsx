import React from 'react';
import styled from 'styled-components';
import { LoadContext } from 'libs/context';
import MediaStatus from 'components/dashboard/MediaStatus';
import useReportLoad from './hooks/useReportLoad';
import SelectBox from './subComponents/SelectBox';
import useFormatize from './hooks/useFormatize';
import TotalAdStatus from './TotalAdStatus';

export default function DashboardLayout() {
  const { firstReportData } = useReportLoad();
  const { processedWeeks } = useFormatize(firstReportData);
  const { componentLoadingState } = React.useContext(LoadContext);
  const [childrenLoadingStates, setChildrenLoadingStates] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    const graphsLoadingStates = Object.values(componentLoadingState).filter(
      (childLoadingState: boolean | undefined) => childLoadingState,
    );

    if (graphsLoadingStates.length === 0) {
      setChildrenLoadingStates(false);
    } else {
      setChildrenLoadingStates(true);
    }
  }, [componentLoadingState]);

  return (
    <DashboardContainer isLoading={childrenLoadingStates}>
      <DashboardHeaderBox>
        <DashboardHeader>대시보드</DashboardHeader>
        <SelectBox weeksList={processedWeeks} />
      </DashboardHeaderBox>
      <TotalAdStatus weeksList={processedWeeks} />
      <MediaStatus />
    </DashboardContainer>
  );
}

const DashboardContainer = styled.article<{ isLoading: boolean }>`
  padding: 30px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
  pointer-events: ${(props) => (props.isLoading ? 'none' : 'auto')};
`;
const DashboardHeaderBox = styled.section`
  margin-bottom: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const DashboardHeader = styled.h1`
  font-size: calc(${({ theme }) => theme.fontSizes.xxlarge} * 1.5);
  color: ${({ theme }) => theme.colors.fontColor};
  ${({ theme }) => theme.media.small} {
    font-size: calc(${({ theme }) => theme.fontSizes.large} * 1.5);
  }
`;
