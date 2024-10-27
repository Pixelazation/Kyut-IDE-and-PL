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
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center space-y-6">
        <h1 className="text-4xl font-bold text-pink-700 space-y-10">Welcome to Kyut</h1>
        
        <p className="text-lg text-gray-700">An IDE and Programming Language by:</p>
        
        <ul className="space-y-1">
          <li className="text-lg font-semibold text-pink-600">Dee, Francis Philippe</li>
          <li className="text-lg font-semibold text-pink-600">Ramacula, Mary Jannin</li>
          <li className="text-lg font-semibold text-pink-600">Tan, Joshua David</li>
        </ul>
      </div>
    </div>
  );
}

export default Landing;
