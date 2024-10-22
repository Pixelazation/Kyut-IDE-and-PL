import { MdOutlineSaveAs } from 'react-icons/md'

function SaveAsButton(): JSX.Element {
  return (
    <button className="hover:text-pink-dark" title="Save As">
      <MdOutlineSaveAs />
    </button>
  )
}

export default SaveAsButton
