import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Requests from "../../../../shared/api/Requests";
import { Pagination } from "../../../../shared/components/Pagination/Pagination";
import { QuestionType } from "../../../../shared/components/QuestionType/QuestionType";
import useHttpClient from "../../../../shared/hooks/http-hook";
import { pageActions } from "../../../../shared/store/page-slice";

function MenuType() {
  // const [typeList, setTypeList] = useState()
  
  return (
    <div className="flex flex-col space-y-6 rounded-sm text-center">
      <h1 className="text-white font-semibold uppercase rounded-sm">Danh Mục</h1>
      <QuestionType className="bg-white w-fit"/>
    </div>
  );
}

export default MenuType;
