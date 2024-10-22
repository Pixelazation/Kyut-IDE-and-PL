import { VscNewFile } from 'react-icons/vsc'

function NewButton(): JSX.Element {
  return (
    <button className="hover:text-pink-dark" title="New File">
      <VscNewFile />
    </button>
  )
}

export default NewButton
