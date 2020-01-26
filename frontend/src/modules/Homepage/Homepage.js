import React, { useState } from "react";
import DefaultLayout from "../shared/layouts/DefaultLayout/DefaultLayout";
import Ads from "./Ads";
import {
  ContentSection,
  SearchSection,
  SearchBox,
} from "./Homepage.components";
import Input from "../shared/components/Input/Input";
import Select from "../shared/components/Select/Select";
import useCategoriesOptions from "../shared/hooks/useCategoriesOptions";
import useInputState from "../../common/helpers/useInputState";

const Homepage = () => {
  const [name, setName] = useInputState();
  const [category, setCategory] = useState();
  const [priceMin, setPriceMin] = useInputState();
  const [priceMax, setPriceMax] = useInputState();

  const {
    data: categories,
    loading: categoriesLoading,
  } = useCategoriesOptions();

  return (
    <DefaultLayout>
      <SearchSection>
        <SearchBox>
          <span>Wyszukaj</span>
          <Input value={name} onChange={setName} />
        </SearchBox>
        <SearchBox>
          <span>Kategoria</span>
          <Select
            value={category}
            onChange={setCategory}
            options={categories}
            isLoading={categoriesLoading}
          />
        </SearchBox>
        <SearchBox>
          <span>Cena</span>
          <Input
            placeholder="Minimalna cena"
            value={priceMin}
            onChange={setPriceMin}
            type="number"
            step="0.01"
            min="0"
          />
          <Input
            placeholder="Maksymalna cena"
            value={priceMax}
            onChange={setPriceMax}
            type="number"
            step="0.01"
            min="0"
          />
        </SearchBox>
      </SearchSection>
      <ContentSection>
        {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
        <h1 />
        <Ads
          name={name}
          categoryId={category && category.value}
          priceMin={priceMin}
          priceMax={priceMax}
        />
        {/* {routesConfig.map(route => (
          <Link key={route.path} to={route.path}>
            {route.path}
          </Link>
        ))} */}
      </ContentSection>
    </DefaultLayout>
  );
};

export default Homepage;
