import CloseButton from './buttons/CloseButton'
import CompileButton from './buttons/CompileButton'
import CutButton from './buttons/CutButton'
import ExecuteButton from './buttons/ExecuteButton'
import NewButton from './buttons/NewButton'
import OpenButton from './buttons/OpenButton'
import PasteButton from './buttons/PasteButton'
import SaveAsButton from './buttons/SaveAsButton'
import SaveButton from './buttons/SaveButton'

function Toolbar(): JSX.Element {
  return (
    <div className="w-dvw bg-pink-light flex flex-row justify-between text-4xl px-4 py-2">
      <div className="flex flex-row gap-4">
        <div className="flex flex-row gap-1">
          <NewButton />
          <OpenButton />
          <SaveButton />
          <SaveAsButton />
          <CloseButton />
        </div>
        <div className="flex flex-row gap-1">
          <CutButton />
          <PasteButton />
        </div>
      </div>
      <div className="flex flex-row gap-1">
        <CompileButton />
        <ExecuteButton />
      </div>
    </div>
  )
}

export default Toolbar
