import React, { useCallback, useMemo } from "react";
import useInputState from "../../common/helpers/useInputState";
import { routesPaths } from "../Routing/routesPaths";
import Box from "../shared/components/Box";
import Input from "../shared/components/Input";
import DefaultLayout from "../shared/layouts/DefaultLayout/DefaultLayout";
import {
  ContentSection,
  ForgotPassword,
  SubmitButton,
  Subtext,
} from "./Login.components";

const Login = () => {
  const [email, handleEmailChange] = useInputState();
  const [password, handlePasswordChange] = useInputState();

  const handleSubmit = useCallback(() => {
    alert(`szczelam do api ${email} ${password}`);
  }, [email, password]);

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
        <Box actions={actions}>
          <Input
            type="email"
            autoComplete="email"
            placeholder="E-mail"
            value={email}
            onChange={handleEmailChange}
          />
          <Input
            type="password"
            autoComplete="current-password"
            placeholder="Hasło"
            value={password}
            onChange={handlePasswordChange}
          />
          <ForgotPassword to={routesPaths.RESET_PASSWORD}>
            Przypomnienie hasła
          </ForgotPassword>
          <SubmitButton onClick={handleSubmit}>Zaloguj się</SubmitButton>
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
