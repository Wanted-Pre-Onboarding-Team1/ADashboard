import { FlexCenter } from 'libs/style/commonStyles';
import React from 'react';
import styled from 'styled-components';
import { AdsData } from 'types/ad';

interface CardInnerProps {
  form: AdsData;
  onChangeForm: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onChangeReportForm: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  setDetectData: () => void;
}

function AddCardInner({
  form,
  onChangeForm,
  onChangeReportForm,
  setDetectData,
}: CardInnerProps) {
  const { report, startDate, status } = form;
  return (
    <>
      <CardInnerStyled>
        <AdCategory>상태</AdCategory>
        <AdInputBox>
          <AdSelectBox name="status" onChange={onChangeForm} value={status}>
            <option value="active">진행중</option>
            <option value="ended">종료</option>
          </AdSelectBox>
        </AdInputBox>
      </CardInnerStyled>
      <CardInnerStyled>
        <AdCategory>광고 생성일</AdCategory>
        <AdInputBox>
          <AdInput
            type="date"
            name="startDate"
            onChange={onChangeForm}
            value={startDate}
          />
        </AdInputBox>
      </CardInnerStyled>
      <CardInnerStyled>
        <AdCategory>일 회망 예산</AdCategory>
        <AdInputBox>
          <AdInput
            type="number"
            name="budget"
            onChange={onChangeForm}
            placeholder="일 희망 예산(숫자) 입력"
          />
        </AdInputBox>
      </CardInnerStyled>
      <CardInnerStyled>
        <AdCategory>광고 수익률</AdCategory>
        <AdInputBox>
          <AdInput
            type="number"
            name="roas"
            onChange={onChangeReportForm}
            value={Math.round(report.roas)}
            disabled
          />
        </AdInputBox>
      </CardInnerStyled>
      <CardInnerStyled>
        <AdCategory>매출</AdCategory>
        <AdInputBox>
          <AdInput
            type="number"
            name="convValue"
            onChange={onChangeReportForm}
            placeholder="매출(숫자) 입력"
          />
        </AdInputBox>
      </CardInnerStyled>
      <CardInnerStyled>
        <AdCategory>광고 비용</AdCategory>
        <AdInputBox>
          <AdInput
            type="number"
            name="cost"
            onChange={onChangeReportForm}
            placeholder="광고 비용(숫자) 입력"
          />
        </AdInputBox>
      </CardInnerStyled>
    </>
  );
}
const CardInnerStyled = styled.div`
  display: flex;
  width: 90%;
  margin: 0 auto;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrayColor};
`;

const AdCategory = styled.span`
  flex: 1;
  margin: 10px 0;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.lightGrayColor};
`;

const AdInputBox = styled(FlexCenter)`
  align-items: center;
`;

const AdSelectBox = styled.select`
  border: 1px solid ${({ theme }) => theme.colors.lightBlueColor};
  border-radius: 4px;
  height: 28px;
  padding: 0 6px;
  width: 160px;
  font-weight: 600;
`;

const AdInput = styled.input`
  height: 28px;
  padding: 0 6px;
  width: 160px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.lightBlueColor};
`;

export default AddCardInner;
