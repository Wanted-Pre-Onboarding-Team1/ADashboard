/* eslint-disable dot-notation */
/* eslint-disable no-param-reassign */
import useMediaLoad from 'components/dashboard/hooks/useMediaLoad';
import { WeekContext } from 'libs/context';
import { useCallback, useContext, useEffect, useState } from 'react';
import {
  TransformedMediaData,
  DataType,
  CompanyType,
  KoreanDataType,
  ExtendedMediaData,
} from 'types/media-status';
import { MediaData } from 'types/dashboard';

function useMediaData() {
  const [data, setData] = useState<MediaData[]>([]);
  const { currentWeekData } = useContext(WeekContext);
  const { currentWeek } = currentWeekData;
  const { totalDataContainingDates: mediaData } = useMediaLoad(
    currentWeek[0],
    currentWeek[1],
  );

  useEffect(() => {
    if (!mediaData) return;
    if (mediaData) {
      const mediaDataCopy = [...mediaData];

      const addRevenueToMediaData = (CopyData: MediaData[]) => {
        CopyData.forEach((dataItem) => {
          dataItem.revenue = (dataItem.roas * dataItem.cost) / 100;
        });
      };

      const addKoreanToMediaData = (CopyData: ExtendedMediaData[]) => {
        CopyData.forEach((dataItem) => {
          dataItem['광고비'] = dataItem['cost'];
          dataItem['매출'] = dataItem['revenue'];
          dataItem['노출수'] = dataItem['imp'];
          dataItem['클릭수'] = dataItem['click'];
          dataItem['전환수'] = dataItem['convValue'];
          dataItem['클릭률 (CTR)'] = dataItem['ctr'];
          dataItem['전환율 (CVR)'] = dataItem['cvr'];
          dataItem['클릭당비용 (CPC)'] = dataItem['cpc'];
          dataItem['전환당비용 (CPA)'] = dataItem['cpa'];
        });
      };

      addRevenueToMediaData(mediaDataCopy);
      addKoreanToMediaData(mediaDataCopy);
      setData(mediaDataCopy);
    }
  }, [mediaData]);

  const filterDataByCompany = useCallback(
    (company: CompanyType) => {
      return data.filter((dataItem) => dataItem.channel === company);
    },
    [data],
  );

  const sumTargetDataByCompany = useCallback(
    (company: CompanyType, target: DataType | KoreanDataType) => {
      return filterDataByCompany(company)
        .map((item: any) => item[target])
        .reduce((prev, current) => prev + current, 0);
    },
    [filterDataByCompany],
  );

  const sumTargetDataOfCompanies = useCallback(
    (target: DataType | KoreanDataType): number => {
      const companies: CompanyType[] = ['google', 'facebook', 'kakao', 'naver'];
      let total = 0;

      companies.forEach((company) => {
        total += sumTargetDataByCompany(company, target);
      });

      return total;
    },
    [sumTargetDataByCompany],
  );

  const averageTargetDataByCompany = useCallback(
    (company: CompanyType, target: DataType | KoreanDataType) => {
      const filteredData = filterDataByCompany(company);

      return (
        filteredData
          .map((item: any) => item[target])
          .reduce((prev, current) => prev + current, 0) / filteredData.length
      );
    },
    [filterDataByCompany],
  );

  const getStackedBarData = useCallback((): TransformedMediaData[] => {
    const transformedData: TransformedMediaData[] = [];
    const targets: KoreanDataType[] = [
      '광고비',
      '매출',
      '노출수',
      '클릭수',
      '전환수',
    ];

    data &&
      targets.forEach((target: KoreanDataType) => {
        const totalTargetData = sumTargetDataOfCompanies(target);

        transformedData.push({
          name: target,
          google:
            (sumTargetDataByCompany('google', target) / totalTargetData) * 100,
          facebook:
            (sumTargetDataByCompany('facebook', target) / totalTargetData) *
            100,
          naver:
            (sumTargetDataByCompany('naver', target) / totalTargetData) * 100,
          kakao:
            (sumTargetDataByCompany('kakao', target) / totalTargetData) * 100,
          total: totalTargetData,
        });
      });
    return transformedData;
  }, [data, sumTargetDataByCompany, sumTargetDataOfCompanies]);

  const getTableData = useCallback((): TransformedMediaData[] => {
    const companies: CompanyType[] = ['google', 'facebook', 'kakao', 'naver'];
    const transformedData: TransformedMediaData[] = [];
    const targets: (DataType | KoreanDataType)[] = [
      '광고비',
      '노출수',
      '클릭수',
      '전환수',
      'roas',
      '클릭률 (CTR)',
      '전환율 (CVR)',
      '클릭당비용 (CPC)',
      '전환당비용 (CPA)',
    ];

    data &&
      targets.forEach((target: DataType | KoreanDataType) => {
        if (
          target === 'roas' ||
          target === '클릭률 (CTR)' ||
          target === '전환율 (CVR)'
        ) {
          transformedData.push({
            name: target,
            google: averageTargetDataByCompany('google', target),
            facebook: averageTargetDataByCompany('facebook', target),
            naver: averageTargetDataByCompany('naver', target),
            kakao: averageTargetDataByCompany('kakao', target),
            total: companies
              .map((company) => averageTargetDataByCompany(company, target))
              .reduce((prev, current) => prev + current, 0),
          });
        } else {
          transformedData.push({
            name: target,
            google: sumTargetDataByCompany('google', target),
            facebook: sumTargetDataByCompany('facebook', target),
            naver: sumTargetDataByCompany('naver', target),
            kakao: sumTargetDataByCompany('kakao', target),
            total: sumTargetDataOfCompanies(target),
          });
        }
      });
    return transformedData;
  }, [
    averageTargetDataByCompany,
    data,
    sumTargetDataByCompany,
    sumTargetDataOfCompanies,
  ]);

  return { getStackedBarData, getTableData };
}

export default useMediaData;
