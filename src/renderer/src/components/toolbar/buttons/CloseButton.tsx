import { FaRegWindowClose } from 'react-icons/fa'

function CloseButton(): JSX.Element {
  return (
    <button className="hover:text-pink-dark">
      <FaRegWindowClose />
    </button>
  )
}

export default CloseButton
