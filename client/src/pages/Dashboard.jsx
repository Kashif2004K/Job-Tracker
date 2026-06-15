import { useEffect, useState } from "react";
import API from "../api/api";

function Dashboard() {
  const [jobs, setJobs] = useState([]);

  // form states
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
        {
          title,
          company,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setCompany("");

      fetchJobs(); // refresh list
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
      {jobs.length === 0 ? (
        <p>No jobs found</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} style={styles.card}>
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <p>Status: {job.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "500px",
    margin: "50px auto",
    fontFamily: "Arial",
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "8px",
    flex: 1,
  },
  button: {
    padding: "8px",
    backgroundColor: "black",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  card: {
    border: "1px solid #ccc",
    padding: "10px",
    marginTop: "10px",
  },
};

export default Dashboard;