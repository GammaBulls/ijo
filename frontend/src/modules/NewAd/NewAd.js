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
import usePostAd from "../../services/usePostAd";

const NewAd = () => {
  const [title, setTitle] = useInputState();
  const [categoriesOptions, categoriesLoading] = useCategoriesOptions();
  const [category, setCategory] = useState();
  const [price, setPrice] = useInputState();
  const [description, setDescription] = useInputState();
  const [photos, setPhotos] = useState([]);
  const [postAd, { loading }] = usePostAd();

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
        categoryId: category.value,
        price,
        description,
        photos,
      };
      try {
        setError(null);
        await validate(values);
        await postAd(values);
      } catch (e) {
        setError(e);
      }
    },
    [category, description, photos, postAd, price, title, validate],
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
