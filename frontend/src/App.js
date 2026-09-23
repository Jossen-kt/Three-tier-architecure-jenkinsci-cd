
import React, { useEffect, useState } from "react";

function App() {
	  const [users, setUsers] = useState([]);
	  const [name, setName] = useState("");
	  const [email, setEmail] = useState("");
	  const [editId, setEditId] = useState(null);

	  const API_URL = "http://43.205.255.38:5555/users";

	  const fetchUsers = () => {
		      fetch(API_URL)
		        .then((res) => res.json())
		        .then((data) => setUsers(data))
		        .catch((err) => console.error(err));
		    };

	  useEffect(() => {
		      fetchUsers();
		    }, []);

	  const addUser = async () => {
		      if (!name || !email) {
			            alert("Please enter Name and Email");
			            return;
			          }

		      await fetch(API_URL, {
			            method: "POST",
			            headers: {
					            "Content-Type": "application/json",
					          },
			            body: JSON.stringify({
					            name,
					            email,
					          }),
			          });

		      setName("");
		      setEmail("");

		      fetchUsers();
		    };

	  const updateUser = async () => {
		      if (!name || !email) {
			            alert("Please enter Name and Email");
			            return;
			          }

		      await fetch(`${API_URL}/${editId}`, {
			            method: "PUT",
			            headers: {
					            "Content-Type": "application/json",
					          },
			            body: JSON.stringify({
					            name,
					            email,
					          }),
			          });

		      setEditId(null);
		      setName("");
		      setEmail("");

		      fetchUsers();
		    };

	  const deleteUser = async (id) => {
		      const confirmDelete = window.confirm(
			            "Are you sure you want to delete this employee?"
			          );

		      if (!confirmDelete) return;

		      await fetch(`${API_URL}/${id}`, {
			            method: "DELETE",
			          });

		      fetchUsers();
		    };

	  return (
		      <div
		        style={{
				        maxWidth: "1000px",
					        margin: "40px auto",
					        fontFamily: "Arial, sans-serif",
					      }}
		      >
		        <h1
		          style={{
				            textAlign: "center",
					            color: "#333",
					          }}
		        >
		          Employee Management System
		        </h1>

		        <div
		          style={{
				            border: "1px solid #ddd",
					            borderRadius: "10px",
					            padding: "20px",
					            marginBottom: "30px",
					            backgroundColor: "#f9f9f9",
					          }}
		        >
		          <h3>
		            {editId ? "Update Employee" : "Add Employee"}
		          </h3>

		          <input
		            type="text"
		            placeholder="Employee Name"
		            value={name}
		            onChange={(e) => setName(e.target.value)}
		            style={{
				                width: "250px",
					                padding: "10px",
					                marginRight: "10px",
					                marginBottom: "10px",
					              }}
		          />

		          <input
		            type="email"
		            placeholder="Employee Email"
		            value={email}
		            onChange={(e) => setEmail(e.target.value)}
		            style={{
				                width: "300px",
					                padding: "10px",
					                marginRight: "10px",
					                marginBottom: "10px",
					              }}
		          />

		          {editId ? (
				            <button
				              onClick={updateUser}
				              style={{
						                    padding: "10px 20px",
							                    backgroundColor: "#007bff",
							                    color: "white",
							                    border: "none",
							                    borderRadius: "5px",
							                    cursor: "pointer",
							                    marginRight: "10px",
							                  }}
				            >
				              Update Employee
				            </button>
				          ) : (
						            <button
						              onClick={addUser}
						              style={{
								                    padding: "10px 20px",
									                    backgroundColor: "green",
									                    color: "white",
									                    border: "none",
									                    borderRadius: "5px",
									                    cursor: "pointer",
									                  }}
						            >
						              Add Employee
						            </button>
						          )}

		          {editId && (
				            <button
				              onClick={() => {
						                    setEditId(null);
						                    setName("");
						                    setEmail("");
						                  }}
				              style={{
						                    padding: "10px 20px",
							                    backgroundColor: "gray",
							                    color: "white",
							                    border: "none",
							                    borderRadius: "5px",
							                    cursor: "pointer",
							                  }}
				            >
				              Cancel
				            </button>
				          )}
		        </div>

		        <table
		          style={{
				            width: "100%",
					            borderCollapse: "collapse",
					          }}
		        >
		          <thead>
		            <tr
		              style={{
				                    backgroundColor: "#343a40",
					                    color: "white",
					                  }}
		            >
		              <th style={{ padding: "12px" }}>ID</th>
		              <th style={{ padding: "12px" }}>Name</th>
		              <th style={{ padding: "12px" }}>Email</th>
		              <th style={{ padding: "12px" }}>Actions</th>
		            </tr>
		          </thead>

		          <tbody>
		            {users.map((user) => (
				                <tr key={user.id}>
				                  <td
				                    style={{
							                      border: "1px solid #ddd",
								                      padding: "10px",
								                    }}
				                  >
				                    {user.id}
				                  </td>

				                  <td
				                    style={{
							                      border: "1px solid #ddd",
								                      padding: "10px",
								                    }}
				                  >
				                    {user.name}
				                  </td>

				                  <td
				                    style={{
							                                        border: "1px solid #ddd",
								                      padding: "10px",
								                    }}
				                  >
				                    {user.email}
				                  </td>

				                  <td
				                    style={{
							                      border: "1px solid #ddd",
								                      padding: "10px",
								                    }}
				                  >
				                    <button
				                      onClick={() => {
							                          setEditId(user.id);
							                          setName(user.name);
							                          setEmail(user.email);
							                        }}
				                      style={{
							                          backgroundColor: "#ffc107",
								                          color: "black",
								                          border: "none",
								                          padding: "8px 14px",
								                          marginRight: "10px",
								                          borderRadius: "5px",
								                          cursor: "pointer",
								                        }}
				                    >
				                      Edit
				                    </button>

				                    <button
				                      onClick={() => deleteUser(user.id)}
				                      style={{
							                          backgroundColor: "#dc3545",
								                          color: "white",
								                          border: "none",
								                          padding: "8px 14px",
								                          borderRadius: "5px",
								                          cursor: "pointer",
								                        }}
				                    >
				                      Delete
				                    </button>
				                  </td>
				                </tr>
				              ))}
		          </tbody>
		        </table>
		      </div>
		    );
}

export default App;
