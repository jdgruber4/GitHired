import React from 'react';
import './App.css';
import Jobs from './Jobs';
import Title from './Title';

const JOB_API_URL = 'http://localhost:3001/jobs';


async function fetchJobs(updateCb) {
  const res = await fetch(JOB_API_URL);
  let json = await res.json();


  updateCb(json);

}


function App() {

  const [jobList, updateJobs] = React.useState([]);

  React.useEffect(() => {
    fetchJobs(updateJobs);
  }, [])


  return (
    <div className="App">
      <Title />
      <br></br>
      <Jobs jobs={jobList}/>
    </div>
  );
}

export default App;
