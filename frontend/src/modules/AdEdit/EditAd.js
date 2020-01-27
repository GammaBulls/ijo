import React, { useCallback, useState } from "react";
import { generatePath, useHistory } from "react-router";
import useInputState from "../NewAd/../../common/helpers/useInputState";
import useUploadPhoto from "../NewAd/../../services/useUploadPhoto";
import { routesPaths } from "../NewAd/../Routing/routesPaths";
import Button from "../NewAd/../shared/components/Button";
import Input from "../NewAd/../shared/components/Input";
import Select from "../NewAd/../shared/components/Select";
import TextArea from "../NewAd/../shared/components/TextArea";
import useCategoriesOptions from "../NewAd/../shared/hooks/useCategoriesOptions";
import DefaultLayout from "../NewAd/../shared/layouts/DefaultLayout";
import FormSection from "../NewAd/./FormSection";
import LabelWrapper from "../NewAd/./LabelWrapper";
import {
  ContentSection,
  ErrorWrapper,
  FormWrapper,
} from "../NewAd/./NewAd.components";
import { MultiPhotoSelect } from "../NewAd/./PhotoSelect";
import useUpdateAd from "../../services/Ads/useUpdateAd";

const EditAd = ({ data: initial }) => {
  const [title, setTitle] = useInputState(initial.title);
  const [categoriesOptions, categoriesLoading] = useCategoriesOptions();
  const [category, setCategory] = useState(initial.category);
  const [price, setPrice] = useInputState(initial.price);
  const [description, setDescription] = useInputState(initial.description);
  const [postUpdateAd, { loading }] = useUpdateAd();
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
        const newAd = await postUpdateAd(initial.id, { ...values });
        history.push(generatePath(routesPaths.AD, { id: newAd.id }));
      } catch (e) {
        setError(e);
      }
    },
    [
      category,
      description,
      history,
      initial.id,
      postUpdateAd,
      price,
      title,
      validate,
    ],
  );

  return (
    <DefaultLayout>
      <ContentSection>
        <FormWrapper onSubmit={submitHandler}>
          <FormSection title="EDYCJA!">
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
            <LabelWrapper label="Zdjęć nie można edytować"></LabelWrapper>
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

export default EditAd;
