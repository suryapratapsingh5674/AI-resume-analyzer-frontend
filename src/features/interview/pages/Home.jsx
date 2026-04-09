import { useRef, useState } from 'react';
import '../styles/home.scss'
import Navbar from './Navbar';
import { useInterview } from '../hooks/useInterview';
import { useNavigate } from 'react-router';

const Home = () => {
  const [filename, setFilename] = useState("Upload resume");
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const {loading, generatereport} = useInterview();
  const resumeInputRef = useRef();
  const navigate = useNavigate()

  const handleFileChange = ()=>{
    const resume = resumeInputRef.current.files[0]
    setFilename(resume.name);
  }

  const handleFormSubmit = async ()=>{
    const resume = resumeInputRef.current.files[0];
    const data = await generatereport({resume, selfDescription, jobDescription});
    if (!data?._id) return;
    navigate(`/interview/${data._id}`);
  }

  if(loading){
    return(
      <main style={{display:'flex', justifyContent: 'center', alignItems:'center', fontSize: '2vw'}}>
        <h1>Loading your interview plan...</h1>
      </main>
    )
  }

  return (
    <>
    <Navbar/>
    <main className="home">
      <div className="card">
        <div className="left">
          <label htmlFor="JobDescription">Job Description</label>
          <textarea
            name="jobDescription"
            id="jobDescription"
            placeholder="enter job description here..."
            value={jobDescription}
            onChange={(e)=>setJobDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="right">
          <div className="input-group">
            <label className='resume-label' htmlFor="resume">{filename}</label>
            <input ref={resumeInputRef} type="file" name="resume" id="resume" onChange={handleFileChange} />
          </div>
          <div className="input-group">
            <label htmlFor="selfDescription">Self Description</label>
            <textarea
              name="selfDescription"
              id="selfDescription"
              placeholder="Discribe yourself in detail."
              value={selfDescription}
              onChange={(e)=>setSelfDescription(e.target.value)}
            ></textarea>
          </div>
          <button type='submit' onClick={handleFormSubmit} className="geerate-btn">Generate Interview Report</button>
        </div>
      </div>
    </main>
    </>
  );
};

export default Home