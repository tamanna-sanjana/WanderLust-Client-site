import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Components/Backend/Provider/AuthContext";

const AllGuides = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Responsive handler
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch guides
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://wander-lust-server-site.vercel.app/api/guides");
      setPosts(res.data);
      setError(null);
    } catch (err) {
      console.error("❌ Failed to fetch guides:", err);
      setError("Failed to load guides.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  // Toggle status
  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    try {
      await axios.put(
        `https://wander-lust-server-site.vercel.app/api/guide/status/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${await user.getIdToken()}`,
          },
        }
      );
      Swal.fire("Updated!", `Status changed successfully.`, "success");
      fetchPosts();
    } catch (err) {
      console.error("❌ Failed to update status:", err);
      Swal.fire("Error", "Could not update status", "error");
    }
  };

  // Delete guide
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`https://wander-lust-server-site.vercel.app/api/guide/${id}`, {
          headers: {
            Authorization: `Bearer ${await user.getIdToken()}`,
          },
        });
        Swal.fire("Deleted!", "The guide has been deleted.", "success");
        fetchPosts();
      } catch (err) {
        console.error("❌ Error deleting guide:", err);
        Swal.fire("Error", "Failed to delete the guide.", "error");
      }
    }
  };

  // ---------- Styles ----------
  const styles = {
    container: {
      maxWidth: "900px",
      margin: "40px auto",
      padding: "20px",
      fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#f9faff",
      borderRadius: "12px",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    },
    heading: {
      textAlign: "center",
      color: "#2c3e50",
      marginBottom: "25px",
      fontWeight: "700",
      fontSize: "2rem",
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: "0 15px",
    },
    th: {
      backgroundColor: "#2980b9",
      color: "white",
      padding: "12px 20px",
      textAlign: "left",
      fontWeight: "600",
    },
    td: {
      padding: "12px 20px",
      backgroundColor: "white",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    },
    tr: {
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    trHover: {
      transform: "scale(1.02)",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
    },
    card: {
      marginBottom: "20px",
      backgroundColor: "white",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      borderRadius: "12px",
      padding: "15px 20px",
    },
    cardHover: {
      transform: "scale(1.02)",
      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    },
    buttonActive: {
      backgroundColor: "#27ae60",
      color: "white",
      border: "none",
      padding: "8px 14px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "600",
      marginRight: "10px",
    },
    buttonInactive: {
      backgroundColor: "#c0392b",
      color: "white",
      border: "none",
      padding: "8px 14px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "600",
      marginRight: "10px",
    },
    buttonDelete: {
      backgroundColor: "#e74c3c",
      color: "white",
      border: "none",
      padding: "8px 14px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>All Guides</h2>

      {loading && <p style={{ textAlign: "center" }}>Loading guides...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {!loading && posts.length === 0 && (
        <p style={{ textAlign: "center", color: "#7f8c8d" }}>No guides found.</p>
      )}

      {!loading && posts.length > 0 && (
        <>
          {/* Desktop View */}
          {windowWidth > 768 ? (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Facebook</th>
                  <th style={styles.th}>Instagram</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr
                    key={post._id}
                    style={
                      hoveredRow === post._id
                        ? { ...styles.tr, ...styles.trHover }
                        : styles.tr
                    }
                    onMouseEnter={() => setHoveredRow(post._id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td style={styles.td}>{post.name}</td>
                    <td style={styles.td}>
                      <a href={post.fb_link} target="_blank" rel="noreferrer">
                        Facebook
                      </a>
                    </td>
                    <td style={styles.td}>
                      <a href={post.instagram_link} target="_blank" rel="noreferrer">
                        Instagram
                      </a>
                    </td>
                    <td style={styles.td}>
                      <span
                        style={{
                          backgroundColor: post.status === 1 ? "#27ae60" : "#c0392b",
                          color: "white",
                          padding: "6px 12px",
                          borderRadius: "20px",
                          fontWeight: "700",
                        }}
                      >
                        {post.status === 1 ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <button
                        style={post.status === 1 ? styles.buttonInactive : styles.buttonActive}
                        onClick={() => handleToggleStatus(post._id, post.status)}
                      >
                        {post.status === 1 ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        style={styles.buttonDelete}
                        onClick={() => handleDelete(post._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            // Mobile View
            posts.map((post) => (
              <div
                key={post._id}
                style={
                  hoveredRow === post._id
                    ? { ...styles.card, ...styles.cardHover }
                    : styles.card
                }
                onMouseEnter={() => setHoveredRow(post._id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <p><strong>Name:</strong> {post.name}</p>
                <p>
                  <strong>Facebook:</strong>{" "}
                  <a href={post.fb_link} target="_blank" rel="noreferrer">{post.fb_link}</a>
                </p>
                <p>
                  <strong>Instagram:</strong>{" "}
                  <a href={post.instagram_link} target="_blank" rel="noreferrer">{post.instagram_link}</a>
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: "20px",
                      backgroundColor: post.status === 1 ? "#27ae60" : "#c0392b",
                      color: "white",
                      fontWeight: "700",
                    }}
                  >
                    {post.status === 1 ? "Active" : "Inactive"}
                  </span>
                </p>
                <div style={{ marginTop: "10px" }}>
                  <button
                    style={post.status === 1 ? styles.buttonInactive : styles.buttonActive}
                    onClick={() => handleToggleStatus(post._id, post.status)}
                  >
                    {post.status === 1 ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    style={styles.buttonDelete}
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default AllGuides;
