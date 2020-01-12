import React, { useCallback, useMemo } from "react";
import useInputState from "../../common/helpers/useInputState";
import { routesPaths } from "../Routing/routesPaths";
import Box from "../shared/components/Box";
import DefaultLayout from "../shared/layouts/DefaultLayout/DefaultLayout";
import {
  ContentSection,
  StyledInput,
  SubmitButton,
  Subtext,
} from "./Register.components";

const Register = () => {
  const [name, handleNameChange] = useInputState();
  const [phone, handlePhoneChange] = useInputState();
  const [email, handleEmailChange] = useInputState();
  const [password, handlePasswordChange] = useInputState();

  const handleSubmit = useCallback(() => {
    alert(`szczelam do api ${email} ${password}`);
  }, [email, password]);

  const actions = useMemo(
    () => [
      {
        to: routesPaths.LOGIN,
        text: "Zaloguj się",
      },
      {
        to: routesPaths.REGISTER,
        selected: true,
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
            type="text"
            autoComplete="given-name"
            placeholder="Imię"
            value={name}
            onChange={handleNameChange}
          />
          <StyledInput
            type="tel"
            autoComplete="tel"
            placeholder="Numer telefonu"
            value={phone}
            onChange={handlePhoneChange}
          />
          <StyledInput
            type="email"
            autoComplete="email"
            placeholder="E-mail"
            value={email}
            onChange={handleEmailChange}
          />
          <StyledInput
            type="password"
            autoComplete="new-password"
            placeholder="Hasło"
            value={password}
            onChange={handlePasswordChange}
          />
          <SubmitButton>Zarejestruj się</SubmitButton>
          <Subtext>
            Rejestracja oznacza akceptację Regulaminu serwisu w aktualnym
            brzmieniu.
          </Subtext>
        </Box>
      </ContentSection>
    </DefaultLayout>
  );
};

export default Register;
