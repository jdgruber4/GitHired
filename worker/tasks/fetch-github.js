const { job } = require('cron');
var fetch = require('node-fetch');
var redis = require("redis"), 
    client = redis.createClient();

const {promisify} = require('util');
const setAsync = promisify(client.set).bind(client);

const baseURL = 'https://jobs.github.com/positions.json'

async function fetchGithub() {
    
    console.log('fetching github');


    let resultCount = 1;
    let onPage = 0;
    const allJobs = [];


    //while loop to fetch pages
    while(resultCount > 0) {

        const res = await fetch(`${baseURL}?page=${onPage}`);
        const jobs = await res.json();
        allJobs.push(...jobs);
        resultCount = jobs.length;
        console.log('got', resultCount, 'jobs');
        onPage++;
    }
    
    console.log('got', allJobs.length, 'jobs total');
    


//filtering algorithm
const jrJobs = allJobs.filter(job => {
    const jobTitle = job.title.toLowerCase();


    //logic
    if(
        jobTitle.includes('senior') || 
        jobTitle.includes('sr.') || 
        jobTitle.includes('manager') 
    ){
        return false;
    }
    return true;
})

console.log("filtered to: ", jrJobs.length);

// redis set statement
const success = await setAsync("github", JSON.stringify(jrJobs));

console.log({success});


}
module.exports = fetchGithub;