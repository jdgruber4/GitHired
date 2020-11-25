var CronJob = require('cron').CronJob;
const fetchGithub = require('./tasks/fetch-github')

var job = new CronJob('* * * * *', fetchGithub, null, true, 'America/Los_Angeles');
//cron fetches a job every minute
job.start();