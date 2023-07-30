import { useState } from 'react'

import './App.css'
interface KanBanBoard {
  columns: Todolist[]
}

interface Todolist {
  title:string;
  todos:string[]
  inputvalue?:string
}

const initialBoard:KanBanBoard = {
  columns: [
    {
      title:'Todo',
      todos:['Learn React', 'Learn Typescript', 'Learn next.js']
    },
    {
      title:'Doing',
      todos:['Learn React', 'Learn Typescript', 'Learn next.js']
    },
    {
      title:'Done',
      todos:['Learn React', 'Learn Typescript', 'Learn next.js']
    },
    
  ],
}

function App() {
  const [board,setBoard] = useState<KanBanBoard>(initialBoard)
  const handleDeleteItem = (columnIndex:number,todoIndex:number) => {
    const newboard = {...board}
    newboard.columns[columnIndex].todos.splice(todoIndex,1)
    setBoard(newboard)
  }
  const handleNewItemInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    columnIndex: number

  ) => {
    const newboard = {...board}
    newboard.columns[columnIndex].inputvalue = e.target.value
    setBoard(newboard)
  }
  const handleSubmitNewItem = (columnIndex:number) => {
    if (!board.columns[columnIndex].inputvalue) return;
    const newboard = {...board}
    newboard.columns[columnIndex].todos.push(
      newboard.columns[columnIndex].inputvalue!
    );
    newboard.columns[columnIndex].inputvalue = ''
    setBoard(newboard)
  }
  const handleMoveLeft = (
    columnIndex:number,
    todoIndex:number,
  )=> {
    if (columnIndex === 0) return;
    const newboard = {...board}
    const [item] = newboard.columns[columnIndex].todos.splice(todoIndex,1)
    newboard.columns[columnIndex-1].todos.push(item)
    setBoard(newboard)
  }
  const handleMoveRight = (
    columnIndex:number,
    todoIndex:number,
  ) => {
    if (columnIndex === board.columns.length - 1) return;
    const newboard = {...board}
    const [item] = newboard.columns[columnIndex].todos.splice(todoIndex,1)
    newboard.columns[columnIndex+1].todos.push(item)
    setBoard(newboard)
  }
  const next = '>'
  const prev = '<'
  return (
  <div className='flex justify-center items-center gap-16 mt-10'>
    {
      board.columns.map((column,columnIndex) => {
        return (
          <div key={columnIndex}>
            <h2 className='bg-blue-500 text-white text-xl font-bold py-2 px-5 rounded-lg'>{column.title}</h2>
            <ul className='bg-gray-100 pt-2 px-3 h-96 rounded-lg'>
              {column.todos.map((todo,todoIndex) => {
                return <div className='bg-gray-100 '><li className='bg-gray-100 rounded-lg mt-1' key={todoIndex}>
                  <div className='bg-white px-3 rounded-lg py-1'>
                    <button disabled={columnIndex === 0} onClick={() => handleMoveLeft(columnIndex,todoIndex)}>{prev}</button>
                  
                    <span className='bg-white px-2'>{' '}{todo}{' '}</span>
                    <button disabled={columnIndex === board.columns.length -1 } onClick={() => handleMoveRight(columnIndex,todoIndex)}>{next}</button>
                  
                    <button className='ml-1.5' onClick={() => handleDeleteItem(columnIndex,todoIndex)}>x</button>
                  </div>
                  
                </li>
                </div>
              })}
            </ul>
            <div className='relative'>
              <input className='w-full p-2.5 rounded-b-xl shadow-2xl' placeholder='Enter some value' onChange={(e) => handleNewItemInputChange(e,columnIndex)} onKeyDown={(e) => {
                if (e.key === 'Enter') handleSubmitNewItem(columnIndex)
              }} />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="absolute h-5 text-gray-400 bottom-3 right-2"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </div>
            
            
          </div>
        )
      })
    }
  </div>
  )
}

export default App
