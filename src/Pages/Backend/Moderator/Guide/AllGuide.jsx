import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Components/Backend/Provider/AuthContext";

const AllGuide = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await user.getIdToken();
      const res = await axios.get("https://wander-lust-server-site.vercel.app/api/guide", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch (error) {
      console.error("❌ Fetch error:", error);
      setError("⚠️ Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

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

      Swal.fire(
        "Updated!",
        `Status changed to ${newStatus === 1 ? "Active" : "Inactive"}.`,
        "success"
      );
      fetchPosts();
    } catch (error) {
      console.error("❌ Failed to update status:", error);
      Swal.fire("Error", "Could not update status", "error");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`https://wander-lust-server-site.vercel.app/api/guide/${id}`, {
          headers: {
            Authorization: `Bearer ${await user.getIdToken()}`,
          },
        });
        Swal.fire("Deleted!", "The guide has been deleted.", "success");
        fetchPosts();
      } catch (error) {
        console.error("❌ Error deleting guide:", error);
        Swal.fire("Error", "Failed to delete the guide.", "error");
      }
    }
  };

  // Base styles
  const containerStyle = {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f9faff",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  };

  const headingStyle = {
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: "25px",
    fontWeight: "700",
    fontSize: "2rem",
  };

  // Responsive helper styles - will apply via inline style using JS media queries
  // We create a hook for window width to control responsive styles:
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Table styles for desktop
  const tableStyleDesktop = {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 15px",
  };

  const thStyleDesktop = {
    backgroundColor: "#2980b9",
    color: "white",
    padding: "12px 20px",
    textAlign: "left",
    fontWeight: "600",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  };

  const tdStyleDesktop = {
    padding: "12px 20px",
    backgroundColor: "white",
    boxShadow: "0 2px 8px rgb(0 0 0 / 0.1)",
  };

  const trStyleDesktop = {
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };

  const trHoverStyleDesktop = {
    transform: "scale(1.02)",
    boxShadow: "0 8px 20px rgb(0 0 0 / 0.15)",
  };

  // For mobile & small screens: card style rows
  const cardStyle = {
    display: "block",
    marginBottom: "20px",
    backgroundColor: "white",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    borderRadius: "12px",
    padding: "15px 20px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };

  const cardHoverStyle = {
    transform: "scale(1.02)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
  };

  const labelStyle = {
    fontWeight: "700",
    color: "#2980b9",
    display: "inline-block",
    width: "90px",
  };

  const valueStyle = {
    display: "inline-block",
  };

  const linkStyle = {
    color: "#2980b9",
    textDecoration: "none",
    fontWeight: "600",
  };

  const buttonActive = {
    backgroundColor: "#27ae60",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    marginRight: "10px",
    transition: "background-color 0.3s ease",
    minWidth: "90px",
  };

  const buttonInactive = {
    ...buttonActive,
    backgroundColor: "#c0392b",
  };

  const buttonDelete = {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "background-color 0.3s ease",
    minWidth: "90px",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>All Guides</h2>

      {loading && (
        <p style={{ textAlign: "center", fontSize: "1.2rem" }}>Loading guides...</p>
      )}
      {error && (
        <p
          style={{
            color: "red",
            textAlign: "center",
            fontWeight: "600",
            fontSize: "1.1rem",
          }}
        >
          {error}
        </p>
      )}

      {!loading && !error && posts.length === 0 && (
        <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#7f8c8d" }}>
          No guides found.
        </p>
      )}

      {!loading && !error && posts.length > 0 && (
        <>
          {/* Desktop/tablet: show table */}
          {windowWidth > 768 ? (
            <table style={tableStyleDesktop}>
              <thead>
                <tr>
                  <th style={{ ...thStyleDesktop, borderTopLeftRadius: "10px" }}>Name</th>
                  <th style={thStyleDesktop}>Facebook</th>
                  <th style={thStyleDesktop}>Instagram</th>
                  <th style={thStyleDesktop}>Status</th>
                  <th style={{ ...thStyleDesktop, borderTopRightRadius: "10px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr
                    key={post._id}
                    style={
                      hoveredRow === post._id
                        ? { ...trStyleDesktop, ...trHoverStyleDesktop }
                        : trStyleDesktop
                    }
                    onMouseEnter={() => setHoveredRow(post._id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td style={tdStyleDesktop}>{post.name}</td>
                    <td style={tdStyleDesktop}>
                      <a href={post.fb_link} target="_blank" rel="noreferrer" style={linkStyle}>
                        Facebook
                      </a>
                    </td>
                    <td style={tdStyleDesktop}>
                      <a href={post.instagram_link} target="_blank" rel="noreferrer" style={linkStyle}>
                        Instagram
                      </a>
                    </td>
                    <td style={tdStyleDesktop}>
                      <span
                        style={{
                          padding: "6px 12px",
                          borderRadius: "20px",
                          color: "white",
                          backgroundColor: post.status === 1 ? "#27ae60" : "#c0392b",
                          fontWeight: "700",
                          userSelect: "none",
                        }}
                      >
                        {post.status === 1 ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td style={tdStyleDesktop}>
                      <button
                        onClick={() => handleToggleStatus(post._id, post.status)}
                        style={post.status === 1 ? buttonInactive : buttonActive}
                        title={post.status === 1 ? "Deactivate" : "Activate"}
                      >
                        {post.status === 1 ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        onClick={() => handleDelete(post._id)}
                        style={buttonDelete}
                        title="Delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            // Mobile: cards
            <div>
              {posts.map((post) => (
                <div
                  key={post._id}
                  style={hoveredRow === post._id ? { ...cardStyle, ...cardHoverStyle } : cardStyle}
                  onMouseEnter={() => setHoveredRow(post._id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <p>
                    <span style={labelStyle}>Name:</span>
                    <span style={valueStyle}>{post.name}</span>
                  </p>
                  <p>
                    <span style={labelStyle}>Facebook:</span>
                    <a href={post.fb_link} target="_blank" rel="noreferrer" style={linkStyle}>
                      {post.fb_link}
                    </a>
                  </p>
                  <p>
                    <span style={labelStyle}>Instagram:</span>
                    <a href={post.instagram_link} target="_blank" rel="noreferrer" style={linkStyle}>
                      {post.instagram_link}
                    </a>
                  </p>
                  <p>
                    <span style={labelStyle}>Status:</span>
                    <span
                      style={{
                        padding: "6px 12px",
                        borderRadius: "20px",
                        color: "white",
                        backgroundColor: post.status === 1 ? "#27ae60" : "#c0392b",
                        fontWeight: "700",
                        userSelect: "none",
                      }}
                    >
                      {post.status === 1 ? "Active" : "Inactive"}
                    </span>
                  </p>
                  <div style={{ marginTop: "10px" }}>
                    <button
                      onClick={() => handleToggleStatus(post._id, post.status)}
                      style={post.status === 1 ? buttonInactive : buttonActive}
                      title={post.status === 1 ? "Deactivate" : "Activate"}
                    >
                      {post.status === 1 ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      style={buttonDelete}
                      title="Delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllGuide;
