import { useState } from "react";

function App() {

 const [task,setTask] = useState("");
 const [result,setResult] = useState("");

 const submitTask = async() => {

   const response =
   await fetch(
     "http://localhost:8000/execute",
     {
       method:"POST",
       headers:{
         "Content-Type":"application/json"
       },
       body:JSON.stringify({
         task
       })
     }
   );

   const data = await response.json();

   setResult(
      JSON.stringify(
      data,
      null,
      2
   ));
 };

 return (
  <div>

    <h1>Agentic Web</h1>

    <input
      value={task}
      onChange={(e)=>setTask(e.target.value)}
    />

    <button
      onClick={submitTask}
    >
      Execute
    </button>

    <pre>{result}</pre>

  </div>
 );
}

export default App;