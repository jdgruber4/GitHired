import React from 'react';
import './App.css';

import Jobs from './Jobs';

const JOB_API_URL = '/api/jobs';

const mockJobs = [
  {title: 'SWE 1 ', company: 'Google'},
  {title: 'SWE 1 ', company: 'Microsoft'},
  {title: 'SWE 1 ', company: 'Blizzard'}
]

async function fetchJobs(updateCb) {
  const res = await fetch(JOB_API_URL);
  let json = await res.json();
  //bug fixing json parse error
  // try {
  //   await res.json();
  // } catch(e) {
  //   console.log('error:', e.message);
  // }

  updateCb(json);

}


function App() {

  const [jobList, updateJobs] = React.useState([]);

  React.useEffect(() => {
    fetchJobs(updateJobs);
  }, [])


  return (
    <div className="App">
      <Jobs jobs={jobList}/>
    </div>
  );
}

export default App;
