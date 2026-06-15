import { useEffect, useState } from "react";
import "./Dashboard.css";
import API from "../api/api";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");

  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    interview: 0,
    rejected: 0,
    accepted: 0,
  });

  // -------------------------
  // STATS CALCULATION
  // -------------------------
  const calculateStats = (jobs) => {
    const newStats = {
      total: jobs.length,
      applied: 0,
      interview: 0,
      rejected: 0,
      accepted: 0,
    };

    jobs.forEach((job) => {
      if (newStats[job.status] !== undefined) {
        newStats[job.status]++;
      }
    });

    setStats(newStats);
  };

  // -------------------------
  // FETCH JOBS
  // -------------------------
  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJobs(res.data);
      calculateStats(res.data);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // -------------------------
  // ADD JOB
  // -------------------------
  const addJob = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/jobs",
        { title, company },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setCompany("");
      fetchJobs();
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  // -------------------------
  // DELETE JOB
  // -------------------------
  const deleteJob = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchJobs();
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  // -------------------------
  // UPDATE STATUS
  // -------------------------
  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/jobs/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchJobs();
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  // -------------------------
  // UI
  // -------------------------
  return (
    <>
      <Navbar />

      <div className="container">
        <h2>My Jobs Dashboard</h2>

        {/* STATS */}
        <div className="statsContainer">
          <div className="statCard">
            <h3>{stats.total}</h3>
            <p>Total Jobs</p>
          </div>

          <div className="statCard">
            <h3>{stats.applied}</h3>
            <p>Applied</p>
          </div>

          <div className="statCard">
            <h3>{stats.interview}</h3>
            <p>Interview</p>
          </div>

          <div className="statCard">
            <h3>{stats.rejected}</h3>
            <p>Rejected</p>
          </div>

          <div className="statCard">
            <h3>{stats.accepted}</h3>
            <p>Accepted</p>
          </div>
        </div>

        {/* ADD JOB FORM */}
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

          <button type="submit" className="button">
            Add Job
          </button>
        </form>

        {/* JOB LIST */}
        {jobs.map((job) => (
          <div className="card">
  <div>
    <h3>{job.title}</h3>
    <p>{job.company}</p>
  </div>

  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <span className={`status ${job.status}`}>
      {job.status}
    </span>

    <select
      value={job.status}
      onChange={(e) => updateStatus(job._id, e.target.value)}
    >
      <option value="applied">Applied</option>
      <option value="interview">Interview</option>
      <option value="rejected">Rejected</option>
      <option value="accepted">Accepted</option>
    </select>

    <button
      onClick={() => deleteJob(job._id)}
      className="deleteBtn"
    >
      Delete
    </button>
  </div>
</div>
        ))}
      </div>
    </>
  );
}

export default Dashboard;