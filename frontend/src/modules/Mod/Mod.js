import React, { useEffect } from "react";
import useAuthorizedOnly from "../../common/helpers/useAuthorizedOnly";
import useGetReports from "../../services/Mod/useGetReports";
import DefaultLayout from "../shared/layouts/DefaultLayout/DefaultLayout";
import { ContentSection } from "./Mod.components";

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
          <div key={Math.random()}>{JSON.stringify(report)}</div>
        ))}
      </ContentSection>
    </DefaultLayout>
  );
};

export default Mod;
