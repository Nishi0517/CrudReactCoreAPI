import React, { Fragment, useState, useEffect,useRef  } from "react";
import Header from "./Header";
import axios from "axios";
import $ from "jquery";
import "datatables.net";
import "../App.css";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import "datatables.net-bs4/js/dataTables.bootstrap4.min.js";
import { Modal, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';


function UsersList() {
  const [users, setUsers] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [fetchPasswordModel, setFetchPasswordModel] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userPassword, setUserPassword] = useState("");
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    $(document).ready(function () {
      $("#testUsers").DataTable();
    });
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await axios.get(
        "https://localhost:7157/api/Admin/GetAllUsers"
      );
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleDelete = (id) => {
  
    setShowDeleteModal(false); // Close the modal
    setShowPasswordModal(true); // Close the modal
  };
  const handleShowPasswordOK = () => {
    
    setShowPasswordModal(false); // Close the modal
    if(password=="Admin@123"){
      
     FetchPasswod();
    }
    else{
      alert('Opps!!.Password is not valid');
      setPassword("");
    }
  };
 
  // const handleCopy = () => {
  //   textareaRef.current.select();
  //   document.execCommand('copy');
  //   setCopied(true);
  // };
  const handleCopy = () => {
    navigator.clipboard.writeText(userPassword);
    setCopied(true);
    toast.success("Text copied to clipboard!");
  };
  async function FetchPasswod() {
    if (password == "") {
      toast.error("Please enter Password");
      return;
    } 
    try {
      alert(selectedUserId)
     const response= await axios.post("https://localhost:7157/api/Admin/FetchPasswordById", {
        id:selectedUserId,
        email: "string",
        password: "string",
        role: "Admin"
      });
      if (!response.data.hasOwnProperty("error")) {
      
      setPassword("");
      setSelectedUserId("");
      setUserPassword(response.data);
      setFetchPasswordModel(true);
      
      }
      else{
        toast.error("Record not inserted");
      }
    
    } catch (err) {
      console.log(err);
    }
  }
 
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <Fragment>
      <Header />

      <div className="container mt-4">
        <h1 align="center">List of Users</h1>
        <table
          id="testUsers"
          className="table table-dark table table-bordered table-striped"
          align="center"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th className="small-column">Password</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.stname}</td>
                  <td>{user.email}</td>
                  {/* <td>{user.password}</td>     */}
                  <td className="small-column">
                    <button
                      type="button"
                      className="btn btn-warning small-column"
                      onClick={() => {
                        setSelectedUserId(user.id);
                        setShowDeleteModal(true);
                      }}
                    >
                      Show Password
                    </button>
                    <Modal
            show={showDeleteModal && selectedUserId === user.id}
            onHide={() => setShowDeleteModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Want To Show Password of this User?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure you want to see?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button variant="btn btn-warning" onClick={() => handleDelete(user.id)}>
                Yes, Show Password
              </Button>
            </Modal.Footer>
          </Modal>

     

                  </td>
                  <td>{user.role}</td>
                </tr>
              ))
            ) : (
              <p>No useres found.</p>
            )}
          </tbody>
          {/* password model */}

     <Modal
            show={showPasswordModal}
            onHide={() => setShowPasswordModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Password {selectedUserId}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Please Enter Password</p>
              <div className="form-group">
            
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={handlePasswordChange}
            />
            </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowPasswordModal(false)}
              >
                Cancel
              </Button>
              <Button variant="btn btn-warning" onClick={() => handleShowPasswordOK()}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>

{/* fetch password model */}

<Modal
            show={fetchPasswordModel}
            onHide={() => setFetchPasswordModel(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="mr-4">{userPassword}  
              <span style={{ marginLeft: '10px' }}>&nbsp;</span>
              <Button variant="light" className="ml-2 pl-2 background-color: transparent;" onClick={handleCopy}>
  <FontAwesomeIcon icon={faCopy} style={{ fontSize: "13px" }}/>
</Button>
<ToastContainer />
              </p>
              
              {copied ? <span>Copied!</span> : null}
              <textarea
          style={{ position: 'absolute', left: '-9999px' }}
          readOnly
          ref={textareaRef}
          value={password}
        />
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {setFetchPasswordModel(false);
                  setCopied(false)
                }}
              >
                Close
              </Button>
              
            </Modal.Footer>
          </Modal>
         
        </table>
      </div>
    </Fragment>
  );
}

export default UsersList;
