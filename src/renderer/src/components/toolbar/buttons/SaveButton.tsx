import { MdOutlineSave } from 'react-icons/md'

function SaveButton(): JSX.Element {
  return (
    <button className="hover:text-pink-dark" title="Save">
      <MdOutlineSave />
    </button>
  )
}

export default SaveButton
