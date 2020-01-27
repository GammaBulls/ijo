import React, { useState, useCallback } from "react";
import DefaultLayout from "../shared/layouts/DefaultLayout/DefaultLayout";
import { ContentSection } from "./Admin.components";
import useAuthorizedOnly from "../../common/helpers/useAuthorizedOnly";
import useCategoriesOptions from "../shared/hooks/useCategoriesOptions";
import Button from "../shared/components/Button";
import useGetCategories from "../../services/useGetCategories";
import Input from "../shared/components/Input";
import useInputState from "../../common/helpers/useInputState";
import { toast } from "react-toastify";
import useAddCategory from "../../services/Admin/useAddCategory";
import useDeleteCategory from "../../services/Admin/useDeleteCategory";

const Admin = () => {
  const unAuth = useAuthorizedOnly({ requireAdmin: true });
  const [random, setRandom] = useState(Math.random());
  const { data, loading } = useGetCategories({ random });

  const [newCategory, setNewCategory] = useInputState();

  const [categories] = [
    (data || []).map(({ id, category_name }) => ({
      label: category_name,
      value: id,
    })),
    loading,
  ];
  const [addCategory] = useAddCategory();
  const [deleteCategory] = useDeleteCategory();

  const submitNewCategory = useCallback(async () => {
    try {
      await addCategory({ name: newCategory });
      setNewCategory({ target: { value: "" } });
    } catch (e) {
      toast.error(e.toString());
    } finally {
      setRandom(Math.random());
    }
  }, [addCategory, newCategory, setNewCategory]);

  const deleteSomeCategory = useCallback(
    id => async () => {
      await deleteCategory({ id });
      toast.success("Sukces");
      setRandom(Math.random());
    },
    [deleteCategory],
  );

  if (unAuth) return null;
  return (
    <DefaultLayout>
      <ContentSection>
        <h3>Zarządzanie kategoriami</h3>
        <div style={{ display: "flex", marginBottom: 20 }}>
          <Button
            style={{ minWidth: 50, marginRight: 20 }}
            onClick={submitNewCategory}
          >
            Dodaj
          </Button>
          <Input value={newCategory} onChange={setNewCategory} />
        </div>
        {categories.map((category, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <Button
              style={{ minWidth: 30 }}
              onClick={deleteSomeCategory(category.value)}
            >
              Skasuj
            </Button>
            <span style={{ marginLeft: 20, marginRight: 10 }}>
              <b>{category.value}</b>
            </span>
            <span>{category.label}</span>
          </div>
        ))}
      </ContentSection>
    </DefaultLayout>
  );
};

export default Admin;
