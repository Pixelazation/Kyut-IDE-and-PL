import { LuUndo2 } from 'react-icons/lu'

function UndoButton(): JSX.Element {
  return (
    <button className="hover:text-pink-dark" title="Undo">
      <LuUndo2 />
    </button>
  )
}

export default UndoButton
