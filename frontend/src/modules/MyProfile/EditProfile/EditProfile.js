import React, { useState, useCallback } from "react";
import Input from "../../shared/components/Input";
import { Wrapper } from "./EditProfile.components";
import { useAppContext } from "../../App/AppContext";
import useInputState from "../../../common/helpers/useInputState";
import Button from "../../shared/components/Button";
import useUpdateMe from "../../../services/Me/useUpdateMe";
import { toast } from "react-toastify";

const EditProfile = () => {
  const { userInfo, update } = useAppContext();
  const [name, setName] = useInputState(userInfo.name);
  const [email, setEmail] = useInputState(userInfo.email);
  const [showPhone, setShowPhone] = useState(userInfo.show_phone);
  const [phoneNumber, setPhoneNumber] = useInputState(userInfo.phone_number);
  const [updateMe] = useUpdateMe();

  const onSubmitClick = useCallback(async () => {
    try {
      await updateMe({ name, email, phone: phoneNumber.toString(), showPhone });
      await update();
      toast.success("Profile updated");
    } catch (e) {
      toast.error("Error occured");
      toast.error(e.message);
    }
  }, [email, name, phoneNumber, showPhone, update, updateMe]);

  return (
    <>
      <h2>Poniżej możesz edytować swoje dane</h2>
      <Wrapper>
        <label>
          Imię
          <Input value={name} onChange={setName} />
        </label>
        <label>
          Email
          <Input value={email} onChange={setEmail} />
        </label>
        <label>
          Widoczność numeru przy ogłoszeniach
          <Input
            type="checkbox"
            checked={showPhone}
            onChange={e => setShowPhone(e.target.checked)}
          />
        </label>
        <label>
          Numer telefonu
          <Input value={phoneNumber} onChange={setPhoneNumber} />
        </label>
        <Button
          style={{ maxWidth: 200, marginTop: 20 }}
          onClick={onSubmitClick}
        >
          Zapisz
        </Button>
      </Wrapper>
    </>
  );
};

export default EditProfile;
