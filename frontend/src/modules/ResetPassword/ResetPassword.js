import React, { useCallback, useMemo } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import useInputState from "../../common/helpers/useInputState";
import useQueryParameters from "../../common/helpers/useQueryParameters";
import useResetPassword from "../../services/Login/useResetPassword";
import useSetNewPassword from "../../services/Login/useSetNewPassword";
import { routesPaths } from "../Routing/routesPaths";
import Box from "../shared/components/Box";
import DefaultLayout from "../shared/layouts/DefaultLayout/DefaultLayout";
import {
  ContentSection,
  ForgotPassword,
  StyledInput,
  SubmitButton,
  Subtext,
} from "./ResetPassword.components";

const ResetPassword = () => {
  const [email, handleEmailChange] = useInputState();
  const [resetPassword, { loading }] = useResetPassword();
  const [setNewPassword, { loadin: loading2 }] = useSetNewPassword();
  const params = useQueryParameters();
  const history = useHistory();

  const token = params.get("token");
  const resetState = token ? "setNew" : "reset";

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      try {
        if (resetState === "reset") {
          const { message: msg } = await resetPassword({ email });
          if (msg === "email sent") {
            toast.success("Sprawdź email!");
          }
        } else {
          await setNewPassword({ resetToken: token, newPassword: email });
          history.push(routesPaths.LOGIN);
          toast.success("Pomyślnie zmieniono hasło!");
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
    [email, history, resetPassword, resetState, setNewPassword, token],
  );

  const actions = useMemo(
    () => [
      {
        to: routesPaths.LOGIN,
        selected: true,
        text: "Resetowanie hasła",
      },
      {
        to: routesPaths.REGISTER,
        text: "Rejestracja",
      },
    ],
    [],
  );

  return (
    <DefaultLayout>
      <ContentSection>
        <Box actions={actions} onSubmit={handleSubmit}>
          {resetState === "reset" && (
            <StyledInput
              type="email"
              autoComplete="email"
              placeholder="E-mail"
              value={email}
              onChange={handleEmailChange}
            />
          )}
          {resetState === "setNew" && (
            <StyledInput
              type="password"
              autoComplete="new-password"
              placeholder="Nowe hasło"
              value={email}
              onChange={handleEmailChange}
            />
          )}
          {resetState === "reset" && (
            <ForgotPassword to={routesPaths.LOGIN}>Logwanie</ForgotPassword>
          )}
          <SubmitButton disabled={loading || loading2}>
            {resetState === "reset" ? "Zresetuj hasło" : "Ustaw nowe hasło"}
          </SubmitButton>
          <Subtext>
            Jeżeli podany email jest poprawny, zostanie wysłana na niego
            wiadomość z linkiem służącym ustawieniu nowego hasła.
          </Subtext>
        </Box>
      </ContentSection>
    </DefaultLayout>
  );
};

export default ResetPassword;
