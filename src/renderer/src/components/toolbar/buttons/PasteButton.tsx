import { FaRegPaste } from 'react-icons/fa6'

function PasteButton(): JSX.Element {
  return (
    <button className="hover:text-pink-dark">
      <FaRegPaste />
    </button>
  )
}

export default PasteButton
