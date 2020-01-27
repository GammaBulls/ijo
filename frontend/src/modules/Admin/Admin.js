import React, { useCallback, useState } from "react";
import useAuthorizedOnly from "../../common/helpers/useAuthorizedOnly";
import Button from "../shared/components/Button";
import DefaultLayout from "../shared/layouts/DefaultLayout/DefaultLayout";
import { ContentSection } from "./Admin.components";
import Categories from "./Categories";
import Users from "./Users";

const Admin = () => {
  const unAuth = useAuthorizedOnly({ requireAdmin: true });
  const [element, setElement] = useState(null);

  const onElement = useCallback(
    element => () => {
      setElement(element);
    },
    [],
  );

  if (unAuth) return null;
  return (
    <DefaultLayout>
      <ContentSection>
        {!element && (
          <>
            <h3>Wybierz czym chcesz zarządzać</h3>
            <Button
              style={{ minWidth: 30, alignSelf: "flex-start" }}
              onClick={onElement("categories")}
            >
              Kategorie
            </Button>
            <Button
              style={{ minWidth: 30, alignSelf: "flex-start", marginTop: 20 }}
              onClick={onElement("mods")}
            >
              Moderatorzy
            </Button>
          </>
        )}
        {element === "categories" && (
          <Categories back={() => setElement(null)} />
        )}
        {element === "mods" && <Users back={() => setElement(null)} />}
      </ContentSection>
    </DefaultLayout>
  );
};

export default Admin;
