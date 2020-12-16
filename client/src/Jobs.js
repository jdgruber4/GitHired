import React from 'react'
import Typography from '@material-ui/core/Typography';
import Job from './Job';
import JobModal from './JobModal'
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';






export default function Jobs({jobs}) {

    React.useEffect(() => {
        const welcomeItem= document.querySelectorAll('.welcome-item');
        let delay = 0;
        welcomeItem.forEach(item => {
            setTimeout(() => item.style.opacity = 1, delay);
            delay += 500;
        })
    }, []);


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
    

    //after clicking on the next or previous page buttons the web page will be displayed at the top
    function scrollToTop () {
        const frame = document.documentElement.scrollTop || document.body.scrollTop;
        if (frame > 0) {
          window.requestAnimationFrame(scrollToTop);
          window.scrollTo(0, frame - frame / 8);
        }
      };
    
    
    function handleNext() {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        scrollToTop();
        
    }

    function handleBack() {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
        scrollToTop();
    }

    
    console.log('job is', jobs[0]);
    return (
        <div className = "jobs">
            <JobModal open={open} job={selectedJob} handleClose={handleClose} />

            <Typography variant="h5" component="h2">
                Found {numJobs} Job Postings:
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