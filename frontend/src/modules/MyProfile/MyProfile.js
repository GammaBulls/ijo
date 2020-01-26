import React from "react";
import { generatePath, useParams } from "react-router";
import { useAppContext } from "../App/AppContext";
import { routesPaths } from "../Routing/routesPaths";
import DefaultLayout from "../shared/layouts/DefaultLayout";
import MyAds from "./MyAds";
import { ContentSection, StyledLink } from "./MyProfile.components";
import MyFavorites from "./MyFavorites";
import EditProfile from "./EditProfile";
import useAuthorizedOnly from "../../common/helpers/useAuthorizedOnly";
import DeleteProfile from "./DeleteProfile";

const MyProfile = () => {
  const unauth = useAuthorizedOnly();

  const { page } = useParams();
  let content = null;
  const { userInfo } = useAppContext();

  if (unauth) {
    return null;
  }

  switch (page) {
    case "ads":
      content = <MyAds />;
      break;
    case "favorite":
      content = <MyFavorites />;
      break;
    case "edit":
      content = <EditProfile />;
      break;
    case "delete":
      content = <DeleteProfile />;
      break;
    default:
      content = (
        <>
          <h3>
            Witaj <b>{userInfo.name}</b>.<br />
          </h3>
          <span>Aby przejść dalej, skorzystaj z poniższych linków:</span>
          <div>
            <StyledLink
              to={generatePath(routesPaths.MY_PROFILE, { page: "ads" })}
            >
              Moje ogłoszenia
            </StyledLink>
            <br />
            <StyledLink
              to={generatePath(routesPaths.MY_PROFILE, { page: "favorite" })}
            >
              Moje ulubione
            </StyledLink>
            <br />
            <StyledLink
              to={generatePath(routesPaths.MY_PROFILE, { page: "edit" })}
            >
              Moje dane
            </StyledLink>
            <br />
            <StyledLink
              to={generatePath(routesPaths.MY_PROFILE, { page: "delete" })}
            >
              Usuń konto
            </StyledLink>
          </div>
        </>
      );
      break;
  }

  return (
    <DefaultLayout>
      <ContentSection>{content}</ContentSection>
    </DefaultLayout>
  );
};

export default MyProfile;
