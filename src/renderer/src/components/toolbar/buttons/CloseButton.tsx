import { FaRegWindowClose } from 'react-icons/fa'

function CloseButton(): JSX.Element {
  return (
    <button className="hover:text-pink-dark" title="Close">
      <FaRegWindowClose />
    </button>
  )
}

export default CloseButton
