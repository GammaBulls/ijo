import React, { useCallback } from "react";
import useDeleteMe from "../../../services/Me/useDeleteMe";
import Button from "../../shared/components/Button";
import { useAppContext } from "../../App/AppContext";

const DeleteProfile = () => {
  const [deleteMe] = useDeleteMe();
  const { update } = useAppContext();

  const onDeleteClick = useCallback(async () => {
    await deleteMe();
    await update();
  }, [deleteMe, update]);

  return (
    <>
      <h3>Usunięcie konta</h3>
      <span>Naciśnij poniższy przycisk aby usunąć konto</span>
      <Button onClick={onDeleteClick}>Skasuj konto</Button>
    </>
  );
};

export default DeleteProfile;
