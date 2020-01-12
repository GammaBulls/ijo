import React, { useMemo, useState, useCallback } from "react";
import useInputState from "../../common/helpers/useInputState";
import Input from "../shared/components/Input";
import Select from "../shared/components/Select";
import TextArea from "../shared/components/TextArea";
import DefaultLayout from "../shared/layouts/DefaultLayout";
import FormSection from "./FormSection";
import LabelWrapper from "./LabelWrapper";
import { ContentSection, FormWrapper, ErrorWrapper } from "./NewAd.components";
import { MultiPhotoSelect } from "./PhotoSelect";
import Button from "../shared/components/Button";

const NewAd = () => {
  const [title, setTitle] = useInputState();
  const [categoriesOptions, loading] = useMemo(
    () => [
      [
        { label: "A", value: 1 },
        { label: "B", value: 2 },
        { label: "C", value: 3 },
      ],
      false,
    ],
    [],
  ); // useCategoriesOptions();
  const [category, setCategory] = useState();
  const [price, setPrice] = useInputState();
  const [description, setDescription] = useInputState();
  const [photos, setPhotos] = useState([]);

  const validate = useCallback(
    async ({ title, category, price, description }) => {
      if (!title || !title.length) {
        throw new Error("Tytuł jest wymagany");
      }
      if (
        !category ||
        !categoriesOptions.some(({ value }) => value === category.value)
      ) {
        throw new Error("Kategoria jest wymagana");
      }
      if (!price || !price.length) {
        throw new Error("Cena jest wymagana");
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
        category,
        price,
        description,
        photos,
      };
      try {
        setError(null);
        await validate(values);
      } catch (e) {
        setError(e);
      }
    },
    [category, description, photos, price, title, validate],
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
                isLoading={loading}
              />
            </LabelWrapper>
            <LabelWrapper label="Podaj cenę" required={true}>
              <Input value={price} onChange={setPrice} />
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
              <Button type="submit">Dodaj ogłoszenie</Button>
            </LabelWrapper>
            {error && <ErrorWrapper>{error.message}</ErrorWrapper>}
          </FormSection>
        </FormWrapper>
      </ContentSection>
    </DefaultLayout>
  );
};

export default NewAd;
