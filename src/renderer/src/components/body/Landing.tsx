// function Landing(): JSX.Element {
//   return (
//     <div className="h-full font-mono">
//       <h1>Welcome to Kyut</h1>
//       <p>An IDE and Programming Language by:</p>
//       <ul>
//         <li>Dee, Francis Philippe</li>
//         <li>Ramacula, Mary Jannin</li>
//         <li>Tan, Joshua David</li>
//       </ul>
//     </div>
//   )
// }

// export default Landing

function Landing(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-pink-300 to-pink-500 text-gray-800 font-mono p-4">
      <div className="bg-pink-100 shadow-lg rounded-lg p-12 max-w-md text-center space-y-6">
        <h1 className="text-center text-4xl font-bold text-pink-600 space-y-20">Welcome to Kyut IDE</h1>
        <ul>
          <p className="text-pink-300">by</p>
          <li className="font-semibold text-pink-400">Dee, Francis Philippe</li>
          <li className="font-semibold text-pink-400">Ramacula, Mary Jannin</li>
          <li className="font-semibold text-pink-400">Tan, Joshua David</li>
        </ul>
        <p className="text-2xl space-y-3 text-center font-semibold text-pink-700"> Click on the "New File" icon to start!</p>
      </div>
    </div>
  );
}

export default Landing;