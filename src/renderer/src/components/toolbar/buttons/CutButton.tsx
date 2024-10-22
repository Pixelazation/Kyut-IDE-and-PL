import { IoCut } from 'react-icons/io5'

function CutButton(): JSX.Element {
  return (
    <button className="hover:text-pink-dark" title="Cut">
      <IoCut />
    </button>
  )
}

export default CutButton
