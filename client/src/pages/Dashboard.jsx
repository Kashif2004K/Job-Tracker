import { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");

  // -------------------------
  // LOAD FROM LOCALSTORAGE
  // -------------------------
  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(storedJobs);
  }, []);

  // -------------------------
  // SAVE TO LOCALSTORAGE
  // -------------------------
  const saveJobs = (updatedJobs) => {
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  };

  // -------------------------
  // ADD JOB
  // -------------------------
  const addJob = (e) => {
    e.preventDefault();

    if (!title || !company) return;

    const newJob = {
      id: Date.now(),
      title,
      company,
      status: "applied",
    };

    const updatedJobs = [...jobs, newJob];

    saveJobs(updatedJobs);

    setTitle("");
    setCompany("");
  };

  // -------------------------
  // DELETE JOB
  // -------------------------
  const deleteJob = (id) => {
    const updatedJobs = jobs.filter((job) => job.id !== id);
    saveJobs(updatedJobs);
  };

  // -------------------------
  // UPDATE STATUS
  // -------------------------
  const updateStatus = (id, status) => {
    const updatedJobs = jobs.map((job) =>
      job.id === id ? { ...job, status } : job
    );

    saveJobs(updatedJobs);
  };

  // -------------------------
  // STATS (DERIVED)
  // -------------------------
  const stats = jobs.reduce(
    (acc, job) => {
      acc.total++;
      acc[job.status]++;
      return acc;
    },
    {
      total: 0,
      applied: 0,
      interview: 0,
      rejected: 0,
      accepted: 0,
    }
  );

  // -------------------------
  // UI
  // -------------------------
  return (
    <div className="container">
      <h2>My Jobs Dashboard</h2>

    
      <div className="statsContainer">
        <div className="statCard"><h3>{stats.total}</h3><p>Total</p></div>
        <div className="statCard"><h3>{stats.applied}</h3><p>Applied</p></div>
        <div className="statCard"><h3>{stats.interview}</h3><p>Interview</p></div>
        <div className="statCard"><h3>{stats.rejected}</h3><p>Rejected</p></div>
        <div className="statCard"><h3>{stats.accepted}</h3><p>Accepted</p></div>
      </div>

  
      <form onSubmit={addJob} className="form">
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
        />

        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="input"
        />

        <button className="button">Add Job</button>
      </form>

  
      {jobs.map((job) => (
        <div className="card" key={job.id}>
          <div>
            <h3>{job.title}</h3>
            <p>{job.company}</p>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <span className={`status ${job.status}`}>{job.status}</span>

            <select
              value={job.status}
              onChange={(e) => updateStatus(job.id, e.target.value)}
            >
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="rejected">Rejected</option>
              <option value="accepted">Accepted</option>
            </select>

            <button
              onClick={() => deleteJob(job.id)}
              className="deleteBtn"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;