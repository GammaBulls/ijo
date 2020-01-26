import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";
import React, { useCallback } from "react";
import useUserToken from "../../common/helpers/useUserToken";
import useCancelDelete from "../../services/Me/useCancelDelete";
import { useAppContext } from "../App/AppContext";
import Button from "../shared/components/Button";
import DefaultLayout from "../shared/layouts/DefaultLayout/DefaultLayout";
import { ContentSection } from "./DeletedUser.components";

const DeletedUser = () => {
  const { userInfo, update } = useAppContext();
  const [cancel] = useCancelDelete();

  const [, setUserToken] = useUserToken();

  const deleteDate = new Date(userInfo.delete_date);

  const formattedDate = formatDistanceToNow(deleteDate, {
    locale: pl,
    addSuffix: true,
  });

  const onCancelClick = useCallback(async () => {
    await cancel();
    await update();
  }, [cancel, update]);

  const onLogoutClick = useCallback(() => {
    setUserToken(null);
  }, [setUserToken]);

  return (
    <DefaultLayout>
      <ContentSection>
        <h3>Twoje konto zostanie usunięte {formattedDate}</h3>
        Dokładna data: <b>{deleteDate.toLocaleString()}</b>
        <br />
        Aby anulować usunięcie naciśnij poniższy przycisk
        <Button
          style={{ maxWidth: 200, marginTop: 20 }}
          onClick={onCancelClick}
        >
          Anuluj usunięcie
        </Button>
        <br />
        Aby się wylogować naciśnij poniższy przycisk
        <Button
          style={{ maxWidth: 200, marginTop: 20 }}
          onClick={onLogoutClick}
        >
          Wyloguj
        </Button>
      </ContentSection>
    </DefaultLayout>
  );
};

export default DeletedUser;
