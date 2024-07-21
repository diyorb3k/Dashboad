import React, { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import "./Data.scss";

const Teachers = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState({
    firstName: "",
    lastName: "",
    level: "",
    groups: "",
  });
  const [newTeacher, setNewTeacher] = useState({
    firstName: "",
    lastName: "",
    level: "",
    groups: "",
  });
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTeachers, setFilteredTeachers] = useState([]);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/teachers/${id}`, { method: "DELETE" });
      setTeachers((prevTeachers) =>
        prevTeachers.filter((teacher) => teacher.id !== id)
      );
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  const handleOpenEditModal = (teacher) => {
    setCurrentTeacher(teacher);
    setShowEditModal(true);
  };

  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setShowAddModal(false);
    setCurrentTeacher({ firstName: "", lastName: "", level: "", groups: "" });
    setNewTeacher({ firstName: "", lastName: "", level: "", groups: "" });
  };

  const handleSaveChanges = async () => {
    try {
      await fetch(`http://localhost:3000/teachers/${currentTeacher.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentTeacher),
      });

      setTeachers((prevTeachers) =>
        prevTeachers.map((teacher) =>
          teacher.id === currentTeacher.id ? currentTeacher : teacher
        )
      );
      handleCloseModal();
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const handleAddTeacher = async () => {
    try {
      const response = await fetch("http://localhost:3000/teachers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTeacher),
      });
      const addedTeacher = await response.json();
      setTeachers([...teachers, addedTeacher]);
      setFilteredTeachers([...teachers, addedTeacher]);
      handleCloseModal();
    } catch (error) {
      console.error("Error adding teacher:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTeacher((prevTeacher) => ({ ...prevTeacher, [name]: value }));
  };

  const handleNewTeacherChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher((prevTeacher) => ({ ...prevTeacher, [name]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/teachers");
        const data = await response.json();
        setTeachers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const results = teachers.filter(
      (teacher) =>
        teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTeachers(results);
  }, [searchTerm, teachers]);

  return (
    <div className="APIdata">
      <div className="searchA">
        <h1>Teachers </h1>
        <TextField className="seach"
          label="Search"
          variant="outlined"
          onChange={(e) => setSearchTerm(e.target.value)}
          
        />
      </div>
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Level</th>
            <th>Groups</th>
            <th className="edit_dalet">Edit / Dalete</th>
          </tr>
        </thead>
        <tbody>
          {filteredTeachers.map((teacher, index) => (
            <tr key={index}>
              <td>{teacher.id}</td>
              <td>{teacher.firstName}</td>
              <td>{teacher.lastName}</td>
              <td>{teacher.level}</td>
              <td>{teacher.groups}</td>
              <td className="edit">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpenEditModal(teacher)}
                >
                  <EditIcon />
                  
                </Button>
                <Button
                  onClick={() => handleDelete(teacher.id)}
                  variant="contained"
                  color="error"
                > 
                {<DeleteIcon />}
                  

                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    
      <Fab className="Add" color="primary" aria-label="add"onClick={handleOpenAddModal} > 
             <AddIcon />
      </Fab>
      <Dialog open={showEditModal} onClose={handleCloseModal}>
        <DialogTitle>Edit Teacher</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please edit the details of the teacher.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            name="firstName"
            type="text"
            fullWidth
            variant="outlined"
            value={currentTeacher.firstName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Last Name"
            name="lastName"
            type="text"
            fullWidth
            variant="outlined"
            value={currentTeacher.lastName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Level"
            name="level"
            type="text"
            fullWidth
            variant="outlined"
            value={currentTeacher.level}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Groups"
            name="groups"
            type="text"
            fullWidth
            variant="outlined"
            value={currentTeacher.groups}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="error">
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="primary"variant="contained" >
          {<SaveIcon />}
            Save
          </Button>
          
        </DialogActions>
      </Dialog>

      <Dialog open={showAddModal} onClose={handleCloseModal}>
        <DialogTitle>Add New Teacher</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the details of the new teacher.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            name="firstName"
            type="text"
            fullWidth
            variant="outlined"
            value={newTeacher.firstName}
            onChange={handleNewTeacherChange}
          />
          <TextField
            margin="dense"
            label="Last Name"
            name="lastName"
            type="text"
            fullWidth
            variant="outlined"
            value={newTeacher.lastName}
            onChange={handleNewTeacherChange}
          />
          <TextField
            margin="dense"
            label="Level"
            name="level"
            type="text"
            fullWidth
            variant="outlined"
            value={newTeacher.level}
            onChange={handleNewTeacherChange}
          />
          <TextField
            margin="dense"
            label="Groups"
            name="groups"
            type="text"
            fullWidth
            variant="outlined"
            value={newTeacher.groups}
            onChange={handleNewTeacherChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddTeacher} color="primary" variant="">
            Add Teacher
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Teachers;
