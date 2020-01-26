import React, { useCallback, useMemo, useEffect } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import useInputState from "../../common/helpers/useInputState";
import useUserToken from "../../common/helpers/useUserToken";
import useLogin from "../../services/Login/useLogin";
import { routesPaths } from "../Routing/routesPaths";
import Box from "../shared/components/Box";
import DefaultLayout from "../shared/layouts/DefaultLayout/DefaultLayout";
import {
  ContentSection,
  ForgotPassword,
  StyledInput,
  SubmitButton,
  Subtext,
} from "./Login.components";
import useQueryParameters from "../../common/helpers/useQueryParameters";

const Login = () => {
  const [email, handleEmailChange] = useInputState();
  const [password, handlePasswordChange] = useInputState();
  const [login, { loading }] = useLogin();
  const history = useHistory();
  const [, setUserToken] = useUserToken();
  const params = useQueryParameters();

  useEffect(() => {
    if (params.get("success") === "true") {
      toast.success("Aktywowano konto");
      history.replace(routesPaths.LOGIN);
    }
  }, [history, params]);

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      try {
        const { access_token } = await login({ email, password });
        setUserToken(access_token);
        history.push(routesPaths.HOMEPAGE);
        toast.success("Pomyślnie zalogowano.");
      } catch (error) {
        toast.error(error.message);
      }
    },
    [email, history, login, password, setUserToken],
  );

  const actions = useMemo(
    () => [
      {
        to: routesPaths.LOGIN,
        selected: true,
        text: "Zaloguj się",
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
          <StyledInput
            type="email"
            autoComplete="email"
            placeholder="E-mail"
            value={email}
            onChange={handleEmailChange}
          />
          <StyledInput
            type="password"
            autoComplete="current-password"
            placeholder="Hasło"
            value={password}
            onChange={handlePasswordChange}
          />
          <ForgotPassword to={routesPaths.RESET_PASSWORD}>
            Przypomnienie hasła
          </ForgotPassword>
          <SubmitButton disabled={loading}>Zaloguj się</SubmitButton>
          <Subtext>
            Zalogowanie oznacza akceptację Regulaminu serwisu w aktualnym
            brzmieniu.
          </Subtext>
        </Box>
      </ContentSection>
    </DefaultLayout>
  );
};

export default Login;
