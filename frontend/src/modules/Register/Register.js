import React, { useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import useInputState from "../../common/helpers/useInputState";
import useRegister from "../../services/useRegister";
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
  const [register, { loading }] = useRegister();

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      try {
        await register({ name, phone, email, password });
        toast.success("Sprawdź maila!");
        //Boże wybacz
        handleNameChange({ target: { value: "" } });
        handlePhoneChange({ target: { value: "" } });
        handleEmailChange({ target: { value: "" } });
        handlePasswordChange({ target: { value: "" } });
      } catch (error) {
        toast.error(error.message);
      }
    },
    [
      email,
      handleEmailChange,
      handleNameChange,
      handlePasswordChange,
      handlePhoneChange,
      name,
      password,
      phone,
      register,
    ],
  );

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
          <SubmitButton disabled={loading}>Zarejestruj się</SubmitButton>
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
