import CreateCategoryForm from "@app/components/Admin/Categories management/CreateCategoryForm";
import MainTitle from "@app/components/Shared/MainTitle";
import React from "react";

const createNewCategory = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-10">
      <MainTitle title="Create new category" />
      <CreateCategoryForm />
    </div>
  );
};

export default createNewCategory;
