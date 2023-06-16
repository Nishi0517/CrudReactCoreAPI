import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LoginPage from "../Components/LoginPage";
import $ from "jquery";
import "datatables.net";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import "datatables.net-bs4/js/dataTables.bootstrap4.min.js";
import Header from "./Header";

function StudentCrud() {
  const tableRef = useRef(null);
  const [id, setId] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [stname, setName] = useState("");
  const [course, setCourse] = useState("");
  const [phoneno, setPhoneNo] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [students, setStudents] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [selectedStateId, setSelectedStateId] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    // $(document).ready(function () {
    //   $("#tblStudents").DataTable();
    // });
    Load();
    fetchCountries();
    setGender("male");

    // return () => {
    //   table.destroy();
    // };
  }, []);

  async function Load() {
    try {
      const result = await axios.get(
        "https://localhost:7157/api/Student/GetStudent"
      );
      setStudents(result.data);
      console.log(result.data);
    } catch (err) {
      alert(err);
    }
  }

  const fetchCountries = () => {
    axios
      .get("https://localhost:7157/api/Student/GetCountry")
      .then((response) => {
        setCountries(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  };
  const fetchStates = (countryId) => {
    axios
      .get(`https://localhost:7157/api/Student/GetStates?id=${countryId}`)
      .then((response) => {
        setStates(response.data);
      })
      .catch((error) => {
        console.error("Error fetching states:", error);
      });
  };
  const fetchCities = (stateId) => {
    axios
      .get(`https://localhost:7157/api/Student/GetCities/${stateId}`)
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });
  };
  const useStudentStateName = (stateId) => {
    const [stateName, setStateName] = useState("");

    useEffect(() => {
      const fetchStateName = async () => {
        if (states.length === 0) {
          // Fetch the states array if it's empty
          await fetchStates();
        }

        const state = states.find((s) => s.id === stateId);

        if (state) {
          setStateName(state.stateName);
        }
      };

      fetchStateName();
    }, [stateId]);

    return stateName;
  };

  const useStudentCityName = (cityId) => {
    const [cityName, setCityName] = useState("");

    useEffect(() => {
      const fetchCityName = async () => {
        // Fetch the city object based on the cityId
        const city = cities.find((c) => c.id === cityId);

        if (city) {
          setCityName(city.cityName);
        }
      };

      fetchCityName();
    }, [cityId]);

    return cityName;
  };

  function checkValidition() {
    if (phoneno == "") {
      toast.error("Phone number is required!!");
      setError(true);
      return;
    } else {
      setError(false);
    }
    if (phoneno.length !== 10) {
      toast.error("Phone number must be 10 digits");
      setError(true);
      return;
    } else {
      setError(false);
    }
    if (stname == "") {
      toast.error("Name is required!!");
      setError(true);
      return;
    } else {
      setError(false);
    }
    if (course == "") {
      toast.error("course is required!!");
      setError(true);
      return;
    } else {
      setError(false);
    }

    if (selectedCountryId == "") {
      toast.error("Select Country From List");
      setError(true);
      return;
    } else {
      setError(false);
    }
    if (selectedStateId == "") {
      toast.error("Select State From List");
      setError(true);
      return;
    } else {
      setError(false);
    }
    if (selectedCityId == "") {
      toast.error("Select City From List");
      setError(true);
      return;
    } else {
      setError(false);
    }
    if (role == "") {
      toast.error("Select Role From List");
      setError(true);
      return;
    } else {
      setError(false);
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email == "") {
      toast.error("Email is required!!");
      setError(true);
      return;
    } else if (!email || !email.match(emailRegex)) {
      toast.error("Please enter a valid email address");
      setError(true);
      return;
    } else {
      setError(false);
    }
    if (password == "") {
      toast.error("Please enter Password");
      setError(true);
      return;
    } else {
      setError(false);
    }
  }

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = (id) => {
    // Delete logic
    // ...
    alert(id);
    deleteStudent(id);
    setShowDeleteModal(false); // Close the modal
  };
  const confirmDeleteStudent = (studentId) => {
    alert(studentId);
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (shouldDelete) {
      alert(studentId);
      deleteStudent(studentId);
    }
  };

  async function save(event) {
    event.preventDefault();
    checkValidition();
    if (error == true) return;
    // Perform validation before submitting the form

    try {
      // const studentData = {
      //   stname: stname,
      //   course: course,
      //   gender: gender,
      //   phoneno: phoneno,
      //   countryId: selectedCountryId,
      //   stateId: selectedStateId,
      //   cityId: selectedCityId,
      //   email:email,
      //   password:password
      // };
     const response= await axios.post("https://localhost:7157/api/Student/AddStudent", {
        stname: stname,
        course: course,
        gender: gender,
        phoneno: phoneno,
        countryId: selectedCountryId,
        stateId: selectedStateId,
        cityId: selectedCityId,
        email: email,
        password: password,
        role: role,
      });
      if (!response.data.hasOwnProperty("error")) {
      toast.success("Record inserted successfully");
      clear();
      Load();
      }
      else{
        toast.error("Record not inserted");
      }
    
    } catch (err) {
      console.log(err);
    }
  }
  async function editStudent(student) {
    alert(student.id);
    setName(student.stname);
    setCourse(student.course);
    setId(student.id);
    setGender(student.gender);
    setPhoneNo(student.phoneno);
    setSelectedCountryId(student.countryId);
    setEmail(student.email);
    setPassword(student.password);
    setRole(student.role); // Set the role value from the student object
    // Fetch states based on the selected country
    await fetchStates(student.countryId);
    // Set the selected state after fetching the states
    setSelectedStateId(student.stateId);

    // Fetch cities based on the selected state
    await fetchCities(student.stateId);

    // Set the selected city after fetching the cities
    setSelectedCityId(student.cityId);
  }
  async function deleteStudent(id) {
    try {
      const response=await axios.delete(
        "https://localhost:7157/api/Student/DeleteStudent/" + id
      );
    if(response.data==true){
      toast.success("Student Deleted Successfully!!");
      clear();
      Load();}
      else{
        toast.error("Something Wrong while deleting record!!");
      }
    } catch (err) {
      alert(err);
    }
  }
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handlePhoneNumberChange = (event) => {
    const { value } = event.target;
    setPhoneNo(value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;
    setRole(selectedRole);
    // Perform actions based on the selected role
    // For example, update state or trigger other functions
  };
  async function clear() {
    setId("");
    setName("");
    setCourse("");
    setGender("male");
    setPhoneNo("");
    setSelectedCountryId(""); // Reset selectedCountryId
    setSelectedStateId(""); // Reset selectedStateId
    setSelectedCityId(""); // Reset selectedCityId
    setEmail("");
    setPassword("");
    setRole("");
  }
  async function update(event) {
    event.preventDefault();
    try {
      checkValidition();
      if(error==true) return;
      const result =await axios.patch(
        "https://localhost:7157/api/Student/updateStudent/" +
          students.find((u) => u.id === id),
        {
          id: id,
          stname: stname,
          course: course,
          phoneno: phoneno,
          gender: gender,
          countryId: selectedCountryId,
          stateId: selectedStateId,
          cityId: selectedCityId,
          email: email,
          password: password,
        }
      );
if(result.data.success){
      toast.success("Student Updated Successfully!!");
      clear();
      Load();
    }
    else {
      toast.error("Opps!!Something wrong, Not updated successfully!!");
      // Perform necessary actions for handling invalid credentials, such as displaying an error message
    }
    } catch (err) {
      // alert(err);
    }
  }

  return (
    // Inside your component
    <>
      <Header />
      <div className="justify-content-center align-items-center vh-100">
        <div>
          {/* Your component code */}
          <ToastContainer />
        </div>

        <div>
          <h1 align="center">Student Registration Details</h1>
          <div className="container mt-4">
            <form>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  hidden
                  value={id}
                  onChange={(event) => {
                    setId(event.target.value);
                  }}
                />

                <label className="text-danger fw-bold">Student Name*</label>

                <input
                  type="text"
                  className="form-control"
                  id="stname"
                  value={stname}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label className="text-danger fw-bold">Course*</label>
                <input
                  type="text"
                  className="form-control"
                  id="course"
                  value={course}
                  onChange={(event) => {
                    setCourse(event.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label className="text-danger fw-bold">Phone No*</label>
                <input
                  type="text"
                  className="form-control"
                  id="phoneno"
                  value={phoneno}
                  onChange={handlePhoneNumberChange}
                />
              </div>
              <div className="form-group">
  <label className="text-danger fw-bold">Role *</label>
  <select
                      className="form-select"
                      value={role} // Set the value to the selectedCityId state
                      onChange={(e) => setRole(e.target.value)} // Update the selectedCityId state on change
                    >
                      <option value="">Select City</option>
                      <option value="Admin">Admin</option>
    <option value="User">User</option>
                    </select>
</div>

              <div className="form-group">
                <label className="mt-4 text-danger fw-bold">Gender</label>
                <div className="row">
                  <div className="col-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        value="male"
                        checked={gender === "male"}
                        onChange={handleGenderChange}
                      />
                      <label className="form-check-label">Male</label>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        value="female"
                        checked={gender === "female"}
                        onChange={handleGenderChange}
                      />
                      <label className="form-check-label">Female</label>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        value="other"
                        checked={gender === "other"}
                        onChange={handleGenderChange}
                      />
                      <label className="form-check-label">Other</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-4">
                  <div className="form-group">
                    <label className="mt-2 text-danger fw-bold">Country*</label>
                    <select
                      className="form-select"
                      value={selectedCountryId} // Set the value to the selectedCountryId state
                      onChange={(e) => {
                        setSelectedCountryId(e.target.value); // Update the selectedCountryId state on change
                        fetchStates(e.target.value);
                      }}
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.countryName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-group">
                    <label className="mt-2 text-danger fw-bold">State*</label>
                    <select
                      className="form-select"
                      value={selectedStateId} // Set the value to the selectedStateId state
                      aria-label="Select City"
                      onChange={(e) => {
                        setSelectedStateId(e.target.value); // Update the selectedStateId state on change
                        fetchCities(e.target.value);
                      }}
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state.id} value={state.id}>
                          {state.stateName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-group">
                    <label className="mt-2 text-danger fw-bold">City*</label>
                    <select
                      className="form-select"
                      value={selectedCityId} // Set the value to the selectedCityId state
                      onChange={(e) => setSelectedCityId(e.target.value)} // Update the selectedCityId state on change
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.cityName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="text-danger fw-bold">Email*</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="form-group">
                <label className="text-danger fw-bold">Password*</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
              <div>
                {Boolean(!id) && (
                  <button className="btn btn-primary mt-4" onClick={save}>
                    Register
                  </button>
                )}
                {Boolean(id) && (
                  <button className="btn btn-warning mt-4" onClick={update}>
                    Update
                  </button>
                )}
              </div>

              <a className="btn btn-success mt-4" href="/login">
                Login
              </a>
            </form>
          </div>
          <br></br>
          <table id="tblStudents" className="table table-dark table table-bordered table-striped"
            align="center">
            <thead>
              <tr>
                <th scope="col">Student Id</th>
                <th scope="col">Student Name</th>
                <th scope="col">Course</th>
                <th scope="col">Phone No</th>
                <th scope="col">Gender</th>
                <th scope="col">Country</th>
                {/* <th scope="col">State</th>
              <th scope="col">City</th> */}
                <th scope="col">Options</th>
              </tr>
            </thead>
            {students.map(function fn(student) {
              // // // Find the country object based on the countryId
              const country = countries.find((c) => c.id === student.countryId);
              // // // Find the state object based on the stateId
              //  const state = states.find((s) => s.id === student.stateId);
              // // // Find the city object based on the cityId
              //  const city = cities.find((c) => c.id === student.cityId);
              //   const stateName = useStudentStateName(student.stateId);
              // const cityName = useStudentCityName(student.cityId);

              return (
                <tbody key={student.id}>
                  <tr>
                    <th scope="row">{student.id}</th>
                    <td>{student.stname}</td>
                    <td>{student.course}</td>
                    <td>{student.phoneno}</td>
                    <td>{student.gender}</td>
                    <td>{country ? country.countryName : ""}</td>
                    {/* <td>{stateName}</td>
          <td>{cityName}</td> */}
                    <td>
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => editStudent(student)}
                      >
                        Edit
                      </button>

                      {/* <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deleteStudent(student.id)}
                    >
                      Delete
                    </button> */}

                      {/* <button
  type="button"
  className="btn btn-danger"
  onClick={() => confirmDeleteStudent(student.id)}
>
  Delete
</button> */}

                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          setSelectedStudentId(student.id);
                          setShowDeleteModal(true);
                        }}
                      >
                        Delete
                      </button>

                      <Modal
                        show={
                          showDeleteModal && selectedStudentId === student.id
                        }
                        onHide={() => setShowDeleteModal(false)}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Confirm Delete</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <p>Are you sure you want to delete?</p>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="secondary"
                            onClick={() => setShowDeleteModal(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(student.id)}
                          >
                            Yes, Delete
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
}

export default StudentCrud;
