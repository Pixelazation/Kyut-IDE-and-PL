import { FaRegPaste } from 'react-icons/fa6'

function PasteButton(): JSX.Element {
  return (
    <button className="hover:text-pink-dark" title="Paste">
      <FaRegPaste />
    </button>
  )
}

export default PasteButton
