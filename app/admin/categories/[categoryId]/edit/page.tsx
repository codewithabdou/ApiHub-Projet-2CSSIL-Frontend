import UpdateCategoryForm from '@app/components/Admin/Categories management/UpdateCategoryForm';
import React from 'react'

 const editCategory = ({
  params: { categoryId },
}: {
  params: { categoryId: string };
}) => {
  return (
  <UpdateCategoryForm categoryId={categoryId} />
  )
}

export default editCategory