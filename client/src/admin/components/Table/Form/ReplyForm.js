import React from 'react'

export const ReplyForm = ({data}) => {
  return (
    <div className="flex flex-col space-y-6">
        <div className="flex w-full py-2 px-10 space-x-20 bg-gray-200 rounded-md">
            <span className="text-xl font-semibold w-1/5">Tên</span>
            <span className="text-xl font-semibold w-4/5">Câu hỏi</span>
            <span className="text-xl font-semibold w-1/5">Gửi vào lúc</span>
        </div>
        <div className="flex w-full py-2 px-10 space-x-20">
            <span className="text-xl font-semibold w-1/5">{data.username_question}</span>
            <span className="text-xl font-semibold w-4/5">{data.question}</span>
            <span className="text-xl font-semibold w-1/5">{data.createdAt}</span>
        </div>
        <textarea className="w-full border px-4 py-2 rounded-lg h-28 outline-none"/>
    </div>
  )
}
