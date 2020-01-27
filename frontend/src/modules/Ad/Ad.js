import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";
import React, { useEffect, useMemo, useCallback, useState } from "react";
import { useParams, useHistory, generatePath } from "react-router";
import useGetAd from "../../services/Ads/useGetAd";
import useGetAdPhotos from "../../services/Ads/useGetAdPhotos";
import useGetAuthor from "../../services/Ads/useGetAuthor";
import Button from "../shared/components/Button";
import useCategoriesOptions from "../shared/hooks/useCategoriesOptions";
import DefaultLayout from "../shared/layouts/DefaultLayout";
import { Author, ContentSection, Info, Wrapper } from "./Ad.components";
import useStartConv from "../../services/Chat/useStartConv";
import { toast } from "react-toastify";
import { routesPaths } from "../Routing/routesPaths";
import { useAppContext } from "../App/AppContext";
import useReportAd from "../../services/Ads/useReportAd";

const Ad = () => {
  const { userInfo } = useAppContext();
  const { id } = useParams();
  const { data, error, loading } = useGetAd({ id });
  const [categories] = useCategoriesOptions();
  const history = useHistory();

  const { data: photoData } = useGetAdPhotos({ id });
  const [getAuthor, { data: authorData }] = useGetAuthor();

  // eslint-disable-next-line no-unused-vars
  const photos = useMemo(() => {
    if (!Array.isArray(photoData)) {
      return [];
    }
    return photoData.map(v => v.link);
  }, [photoData]);

  useEffect(() => {
    if (data && data.owner) {
      getAuthor({ id: data.owner });
    }
  }, [data, getAuthor]);

  const [startConv] = useStartConv();

  const onAuthorClick = useCallback(async () => {
    try {
      const conv = await startConv({ id: data.owner });
      history.push(generatePath(routesPaths.CHAT, { conversationId: conv.id }));
    } catch (e) {
      toast.error("Wystąpił błąd");
    }
  }, [data, history, startConv]);

  const [reportAd] = useReportAd();

  const [reporting, setReporting] = useState(false);

  const onReportClick = useCallback(() => {
    setReporting(true);
  }, []);

  const onRepClick = useCallback(
    isScam => async () => {
      await reportAd({ id, scam: isScam });
      toast.success("Zgłoszono");
      setReporting(false);
    },
    [id, reportAd],
  );

  if (loading) {
    return "Loading...";
  }

  if (error) {
    return `Error: ${error}`;
  }

  const { title, description, start_date, price } = data;
  const category = categories.find(v => v.value === data.category) || {};

  const formattedDate = formatDistanceToNow(new Date(start_date), {
    locale: pl,
    addSuffix: true,
  });

  return (
    <DefaultLayout>
      <ContentSection>
        <h2>{title}</h2>
        <Wrapper>
          <Info>
            <span>Kategoria: {category.label}</span>
            <span>Utworzono: {formattedDate}</span>
            <span>Cena: {price} PLN</span>
            {!!userInfo && !reporting && (
              <Button onClick={onReportClick}>Zgłoś</Button>
            )}
            {!!userInfo && reporting && (
              <Button onClick={onRepClick(true)}>Oszustwo</Button>
            )}
            {!!userInfo && reporting && (
              <Button onClick={onRepClick(false)}>Wulgaryzmy</Button>
            )}
          </Info>
          <Author>
            <span>
              Ogloszenia zamieszczone przez: {authorData && authorData.name}
            </span>
            {authorData && (
              <span>Numer telefonu: {authorData.phone_number || "ukryty"}</span>
            )}
            <Button onClick={onAuthorClick}>Chat z autorem</Button>
          </Author>
        </Wrapper>

        <br />
        {photos.map(link => (
          <img src={link} key={link} alt="zdjecie" />
        ))}
        <h4>Opis:</h4>
        {description}
      </ContentSection>
    </DefaultLayout>
  );
};

export default Ad;
