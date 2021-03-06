import React, { useCallback, useState } from "react";
import useInputState from "../../common/helpers/useInputState";
import Button from "../shared/components/Button";
import Input from "../shared/components/Input";
import Select from "../shared/components/Select";
import TextArea from "../shared/components/TextArea";
import useCategoriesOptions from "../shared/hooks/useCategoriesOptions";
import DefaultLayout from "../shared/layouts/DefaultLayout";
import FormSection from "./FormSection";
import LabelWrapper from "./LabelWrapper";
import { ContentSection, ErrorWrapper, FormWrapper } from "./NewAd.components";
import { MultiPhotoSelect } from "./PhotoSelect";
import usePostAd from "../../services/Ads/usePostAd";
import useUploadPhoto from "../../services/useUploadPhoto";
import { useHistory, generatePath } from "react-router";
import { routesPaths } from "../Routing/routesPaths";

const NewAd = () => {
  const [title, setTitle] = useInputState();
  const [categoriesOptions, categoriesLoading] = useCategoriesOptions();
  const [category, setCategory] = useState();
  const [price, setPrice] = useInputState();
  const [description, setDescription] = useInputState();
  const [photos, setPhotos] = useState([]);
  const [postAd, { loading }] = usePostAd();
  const [uploadPhoto] = useUploadPhoto();
  const history = useHistory();

  const validate = useCallback(
    async ({ title, categoryId, price, description }) => {
      if (!title || !title.length) {
        throw new Error("Tytuł jest wymagany");
      }
      if (
        !categoryId ||
        !categoriesOptions.some(({ value }) => value === categoryId)
      ) {
        throw new Error("Kategoria jest wymagana");
      }
      if (!price || !price.length || !parseFloat(price, 10)) {
        throw new Error("Cena jest wymagana.");
      }
      if (!description || !description.length) {
        throw new Error("Opis jest wymagany");
      }
    },
    [categoriesOptions],
  );
  const uploadPhotos = useCallback(
    async photos =>
      (
        await Promise.all(
          photos.filter(Boolean).map(photo => uploadPhoto({ photo })),
        )
      )
        .map(data => data && data[0] && data[0].id)
        .filter(Boolean),
    [uploadPhoto],
  );

  const [error, setError] = useState(null);
  const submitHandler = useCallback(
    async e => {
      e.preventDefault();
      const values = {
        title,
        categoryId: category && category.value,
        price,
        description,
      };
      try {
        setError(null);
        await validate(values);
        const photoLinks = await uploadPhotos(photos);
        const newAd = await postAd({ ...values, photos: photoLinks });
        history.push(generatePath(routesPaths.AD, { id: newAd.id }));
      } catch (e) {
        setError(e);
      }
    },
    [
      category,
      description,
      history,
      photos,
      postAd,
      price,
      title,
      uploadPhotos,
      validate,
    ],
  );

  return (
    <DefaultLayout>
      <ContentSection>
        <FormWrapper onSubmit={submitHandler}>
          <FormSection title="Zaczynamy!">
            <LabelWrapper label="Wpisz tytuł" required={true}>
              <Input value={title} onChange={setTitle} />
            </LabelWrapper>
            <LabelWrapper label="Wybierz kategorię" required={true}>
              <Select
                value={category}
                onChange={setCategory}
                options={categoriesOptions}
                isLoading={categoriesLoading}
              />
            </LabelWrapper>
            <LabelWrapper label="Podaj cenę" required={true}>
              <Input
                value={price}
                onChange={setPrice}
                type="number"
                step="0.01"
                min="0"
              />
            </LabelWrapper>
          </FormSection>
          <FormSection>
            <LabelWrapper label="Opis" required={true}>
              <TextArea value={description} onChange={setDescription} />
            </LabelWrapper>
            <LabelWrapper label="Dodaj zdjęcia">
              <MultiPhotoSelect
                count={8}
                photos={photos}
                setPhotos={setPhotos}
              />
            </LabelWrapper>
            <LabelWrapper>
              <Button disabled={categoriesLoading || loading} type="submit">
                Dodaj ogłoszenie
              </Button>
            </LabelWrapper>
            {error && <ErrorWrapper>{error.message}</ErrorWrapper>}
          </FormSection>
        </FormWrapper>
      </ContentSection>
    </DefaultLayout>
  );
};

export default NewAd;
