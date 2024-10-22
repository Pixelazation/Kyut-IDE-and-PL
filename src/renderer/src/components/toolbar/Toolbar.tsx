import CloseButton from './buttons/CloseButton'
import CompileButton from './buttons/CompileButton'
import CutButton from './buttons/CutButton'
import ExecuteButton from './buttons/ExecuteButton'
import NewButton from './buttons/NewButton'
import OpenButton from './buttons/OpenButton'
import PasteButton from './buttons/PasteButton'
import RedoButton from './buttons/RedoButton'
import SaveAsButton from './buttons/SaveAsButton'
import SaveButton from './buttons/SaveButton'
import UndoButton from './buttons/UndoButton'

function Toolbar(): JSX.Element {
  return (
    <div className="w-dvw bg-pink-light flex flex-row justify-between text-3xl px-4 py-2">
      <div className="flex flex-row gap-8">
        <div className="flex flex-row gap-2">
          <NewButton />
          <OpenButton />
          <SaveButton />
          <SaveAsButton />
          <CloseButton />
        </div>
        <div className="flex flex-row gap-2">
          <CutButton />
          <PasteButton />
          <UndoButton />
          <RedoButton />
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <CompileButton />
        <ExecuteButton />
      </div>
    </div>
  )
}

export default Toolbar
