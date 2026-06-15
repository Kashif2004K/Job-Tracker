import { useEffect, useState } from "react";
import API from "../api/api";

function Dashboard() {
  const [jobs, setJobs] = useState([]);

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");

  // FETCH JOBS
  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log("TOKEN:", token);

      const res = await API.get("/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJobs(res.data);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // CREATE JOB
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

  // DELETE JOB
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

  // UPDATE STATUS
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

  return (
    <div style={styles.container}>
      <h2>My Jobs Dashboard</h2>

      {/* ADD JOB FORM */}
      <form onSubmit={addJob} style={styles.form}>
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Add Job
        </button>
      </form>

      {/* JOB LIST */}
      {jobs.map((job) => (
        <div key={job._id} style={styles.card}>
          <h3>{job.title}</h3>
          <p>{job.company}</p>

          {/* STATUS DROPDOWN */}
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
            style={styles.deleteBtn}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
  maxWidth: "600px",
  margin: "60px auto",
  fontFamily: "Arial",
  padding: "20px",
},
 form: {
  display: "flex",
  gap: "10px",
  marginBottom: "25px",
  padding: "15px",
  border: "1px solid #eee",
  borderRadius: "10px",
  backgroundColor: "#fafafa",
},
 input: {
  padding: "10px",
  flex: 1,
  border: "1px solid #ddd",
  borderRadius: "6px",
  outline: "none",
},
 button: {
  padding: "10px 14px",
  backgroundColor: "#111",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
},
 deleteBtn: {
  marginTop: "10px",
  padding: "6px 10px",
  backgroundColor: "#ff4d4f",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
},
  card: {
  border: "1px solid #eee",
  padding: "15px",
  marginTop: "12px",
  borderRadius: "10px",
  backgroundColor: "#fff",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
},
status: {
  display: "inline-block",
  padding: "4px 8px",
  borderRadius: "6px",
  fontSize: "12px",
  marginTop: "5px",
  backgroundColor: "#eee",
}
};

export default Dashboard;