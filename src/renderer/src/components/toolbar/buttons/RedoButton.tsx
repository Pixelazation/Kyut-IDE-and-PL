import { LuRedo2 } from 'react-icons/lu'

function RedoButton(): JSX.Element {
  return (
    <button className="hover:text-pink-dark" title="Redo">
      <LuRedo2 />
    </button>
  )
}

export default RedoButton
