import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '../../student/components/UI/Container'
import TableOptions from '../components/Table/TableOptions'
import NewQuestionsTable from '../components/Table/NewQuestionsTable/NewQuestionsTable'
import DisapprovedQuestionsTable from '../components/Table/DisapprovedQuestionsTable/DisapprovedQuestionsTable'
import { ApprovedQuestionsTable } from '../components/Table/ApprovedQuestionsTable/ApprovedQuestionsTable'
import { RepliedQuestionsTable } from '../components/Table/RepliedQuestionsTable/RepliedQuestionsTable'

function QuestionManagement() {
  const [selectedTable, setSelectedTable] = useState('New Question List');

  const onChangeSelectedTable = (selected) =>{
    setSelectedTable(selected);
  }
  
  let table;
  if(selectedTable === 'New Question List'){
    table = (<NewQuestionsTable/>)
  }
  else if(selectedTable === 'Disapproved Question List'){
    table = (<DisapprovedQuestionsTable/>)
  }
  else if(selectedTable === 'Approved Question List'){
    table = (<ApprovedQuestionsTable/>)
  }
  else{
    table = (<RepliedQuestionsTable/>)
  }
  // console.log(selectedTable)
    
  return (
    <Container className="m-auto w-11/12 h-full py-24 px-20 space-y-6">
      <h1 className="text-2xl font-semibold">Question Management</h1>
      <div className="flex flex-col bg-white py-6 px-10 rounded-md items-center space-y-5">
        <div className="flex justify-between w-full">
        <h1 className="text-lg font-semibold self-center text-gray-500">{selectedTable}</h1>
        <TableOptions onChangeSelectedTable={onChangeSelectedTable} selectedTable={selectedTable}/>

        </div>
        <div className='border w-full'></div>
        {table}
        {/* <NewQuestionsTable/> */}
      </div>
    </Container>
  )
}

export default QuestionManagement