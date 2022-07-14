import React from "react";
import { QuestionType } from "../../../../shared/components/QuestionType/QuestionType";

function MenuType() {
  return (
    <div className="flex flex-col space-y-6 rounded-sm text-center">
      <h1 className="text-white font-semibold uppercase rounded-sm">Danh Mục</h1>
      <QuestionType className="bg-white w-fit"/>
    </div>
  );
}

export default MenuType;
