import { VscNewFile } from 'react-icons/vsc'
import splash from '../../../../splash-screen/300.png'

function Landing(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center min-h-full bg-gradient-to-br from-pink-200 via-pink-300 to-pink-500 font-mono p-4">
      <div className="bg-pink-100 shadow-lg rounded-lg p-12 max-w-md text-center flex flex-col justify-center items-center ">
        <h1 className="text-center text-3xl font-bold text-pink-600 space-y-20">
          Welcome to Kyut IDE
        </h1>
        <img className="object-scale-down h-48 w-96" src={splash} />
        <ul>
          <p className="text-pink-300 space-y-5">by</p>
          <li className="font-semibold text-pink-400">Dee, Francis Philippe</li>
          <li className="font-semibold text-pink-400">Ramacula, Mary Jannin</li>
          <li className="font-semibold text-pink-400">Tan, Joshua David</li>
        </ul>
        <p className="text-2xl text-center font-semibold text-pink-700 mt-1">
          Click on the <VscNewFile className="inline" /> icon to start!
        </p>
      </div>
    </div>
  );
}

export default Landing
