import { useCallback, useState } from 'react';
import { postAddAPI } from 'libs/api/adAPI';
import { ADD_DATA } from 'libs/utils/initialDatas';

const useAdPost = (setDetectData: () => void) => {
  const [form, setForms] = useState(ADD_DATA);

  const onChangeForm = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
      setForms({ ...form, [name]: value });
    },
    [form],
  );

  const onChangeReportForm = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
      setForms((prev) => ({
        ...prev,
        report: {
          ...prev.report,
          [name]: value,
          roas:
            name === 'convValue'
              ? ((value as unknown as number) / form.report.cost) * 100
              : (form.report.convValue / (value as unknown as number)) * 100,
        },
      }));
    },
    [form.report.convValue, form.report.cost],
  );

  const onPostForm = async () => {
    await postAddAPI(form);
    setDetectData();
  };

  return { onPostForm, onChangeForm, onChangeReportForm, form };
};

export default useAdPost;
