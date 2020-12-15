import React from 'react'
import Typography from '@material-ui/core/Typography';
import Job from './Job';
import JobModal from './JobModal'
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';





export default function Jobs({jobs}) {

    // modal
    const [open, setOpen] = React.useState(false);
    const [selectedJob, selectJob] = React.useState({});
    function handleClickOpen() {
      setOpen(true);
    }  
    function handleClose() {
      setOpen(false);
    }
    
    // pagination
    const numJobs = jobs.length;
    const numPages = Math.ceil(numJobs / 50);
    const [activeStep, setActiveStep] = React.useState(0);
    const jobsOnPage = jobs.slice(activeStep * 50, (activeStep * 50) + 50);
    
    function handleNext() {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        
    }

    function handleBack() {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
        
    }

    
    console.log('job is', jobs[0]);
    return (
        <div className = "jobs">
            <JobModal open={open} job={selectedJob} handleClose={handleClose} />

            <Typography variant="h5" component="h2">
                Found {numJobs} Jobs
            </Typography>

            {
                jobsOnPage.map(
                    (job, i) => <Job key={i} job={job} onClick={() => {
                        console.log('clicked')
                        handleClickOpen();
                        selectJob(job)
                    }} />
                )
            }
             <div>
                Page {activeStep + 1} of {numPages}
            </div>
            <MobileStepper
                variant="progress"
                steps={numPages}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button size="large" onClick={handleNext} disabled={activeStep === numPages - 1}>
                    Next
                    <KeyboardArrowRight />
                    </Button>
                }
                backButton={
                    <Button size="large" onClick={handleBack} disabled={activeStep === 0}>
                    <KeyboardArrowLeft />
                    Back
                    </Button>
                }
            />
        </div>
    )
}