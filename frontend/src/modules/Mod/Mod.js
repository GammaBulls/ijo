import React, { useEffect } from "react";
import useAuthorizedOnly from "../../common/helpers/useAuthorizedOnly";
import useGetReports from "../../services/Mod/useGetReports";
import DefaultLayout from "../shared/layouts/DefaultLayout/DefaultLayout";
import { ContentSection } from "./Mod.components";
import Button from "../shared/components/Button";
import useGetAd from "../../services/Ads/useGetAd";
import { useCallback } from "react";
import usePostReport from "../../services/Mod/usePostReport";

const Ad = ({ ad_id, reason }) => {
  const { data } = useGetAd({ id: ad_id });
  const [postReport] = usePostReport();

  const okHandler = useCallback(() => {
    postReport({ id: ad_id, isOk: true, banUser: false });
    window.location.reload();
  }, [ad_id, postReport]);

  const deleteHandler = useCallback(() => {
    postReport({ id: ad_id, isOk: false, banUser: false });
    window.location.reload();
  }, [ad_id, postReport]);

  const banHandler = useCallback(() => {
    postReport({ id: ad_id, isOk: false, banUser: true });
    window.location.reload();
  }, [ad_id, postReport]);

  return (
    <div
      style={{
        border: "1px solid black",
        borderRadius: 5,
        marginBottom: 10,
        padding: 20,
      }}
    >
      <h4>
        {data && data.id} - {data && data.title}
      </h4>
      <span>{reason}</span>
      <div>
        <Button style={{ minWidth: 50, marginRight: 20 }} onClick={okHandler}>
          OK
        </Button>
        <Button
          style={{ minWidth: 50, marginRight: 20 }}
          onClick={deleteHandler}
        >
          Usuń ogłoszenie
        </Button>
        <Button style={{ minWidth: 50, marginRight: 20 }} onClick={banHandler}>
          Zbanuj użytkownika
        </Button>
      </div>
    </div>
  );
};

const Mod = () => {
  const unAuth = useAuthorizedOnly({ requireModerator: true });
  const [getReports, { data }] = useGetReports();
  const reports = data || [];

  useEffect(() => {
    getReports();
  }, [getReports]);

  if (unAuth) return null;
  return (
    <DefaultLayout>
      <ContentSection>
        {reports.map(report => (
          <Ad
            key={report.id}
            ad_id={report.advertisement}
            reason={report.report_reason === 1 ? "Oszustwo" : "Wulgaryzmy"}
          />
        ))}
      </ContentSection>
    </DefaultLayout>
  );
};

export default Mod;
