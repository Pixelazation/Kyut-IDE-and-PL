import { IoPlayOutline } from 'react-icons/io5'

function ExecuteButton(): JSX.Element {
  return (
    <button className="hover:text-pink-dark" title="Execute">
      <IoPlayOutline />
    </button>
  )
}

export default ExecuteButton
