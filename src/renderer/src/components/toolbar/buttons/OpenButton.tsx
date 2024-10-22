import { AiOutlineFolderOpen } from 'react-icons/ai'

function OpenButton(): JSX.Element {
  return (
    <button className="hover:text-pink-dark">
      <AiOutlineFolderOpen />
    </button>
  )
}

export default OpenButton
