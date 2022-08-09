import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QuestionType } from "../../../../shared/components/QuestionType/QuestionType";
import { itemActions } from "../../../../shared/store/item-slice";

function MenuType() {
  const dispatch = useDispatch();
  const { typeList} = useSelector((state) => state.item)
  useEffect(() => {
    dispatch(itemActions.changeSelectedType({type: typeList[0]}))
  }, [dispatch, typeList]);
  return (
    <div className="flex flex-col space-y-6 rounded-sm text-center">
      <h1 className="text-white font-semibold uppercase rounded-sm">
        Danh Mục
      </h1>
      <QuestionType className="bg-white w-fit" isSorting />
    </div>
  );
}

export default MenuType;
