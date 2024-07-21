import React, { useEffect, useState } from 'react';
import './Data.scss';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Data = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [newStudent, setNewStudent] = useState({
    firstName: '',
    lastName: '',
    group: '',
    username: '',
    password: '',
  });
  const [currentStudent, setCurrentStudent] = useState(null);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/students/${id}`, { method: 'DELETE' });
      setStudents(prevStudents => prevStudents.filter(student => student.id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleAddStudent = async () => {
    try {
      const response = await fetch('http://localhost:3000/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent),
      });
      const addedStudent = await response.json();
      setStudents([...students, addedStudent]);
      setFilteredStudents([...students, addedStudent]);
      setNewStudent({ firstName: '', lastName: '', group: '', username: '', password: '' });
      setOpenAddDialog(false);
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleEditStudent = async () => {
    try {
      const response = await fetch(`http://localhost:3000/students/${currentStudent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentStudent),
      });
      const updatedStudent = await response.json();
      setStudents(students.map(student => (student.id === updatedStudent.id ? updatedStudent : student)));
      setFilteredStudents(students.map(student => (student.id === updatedStudent.id ? updatedStudent : student)));
      setOpenEditDialog(false);
    } catch (error) {
      console.error('Error editing student:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/students');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const results = students.filter(student =>
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(results);
  }, [searchTerm, students]);

  return (
    <div className='APidata'>
      <div className='searchA'>
      <h1>Student </h1>
  
  <TextField className='seach'
    label="Search"
    variant="outlined"
    margin="normal"
    onChange={(e) => setSearchTerm(e.target.value)}
    sx={{ boxShadow: 3 }}
  />
      </div>
      <table className="student-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Group</th>
            <th>ID</th>
            <th>Username</th>
            <th>Password</th>
            <th>Edit / Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.group}</td>
              <td>{student.id}</td>
              <td>{student.username}</td>
              <td>{student.password}</td>
              <td className='edit'>
                <Button 
                  variant='contained' 
                  onClick={() => {
                    setCurrentStudent(student);
                    setOpenEditDialog(true);
                  }}
                >
                
                  <EditIcon/>
                </Button>
                <Button 
                  onClick={() => handleDelete(student.id)} 
                  className='delete' 
                  variant='contained' 
                  color='error'
                >
                  <DeleteIcon/>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <Fab className="Add" color="primary" aria-label="add" onClick={() => setOpenAddDialog(true)} > 
             <AddIcon />
      </Fab>
      {/* Add Student Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add New Student</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            fullWidth
            value={newStudent.firstName}
            onChange={(e) => setNewStudent({ ...newStudent, firstName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Last Name"
            fullWidth
            value={newStudent.lastName}
            onChange={(e) => setNewStudent({ ...newStudent, lastName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Group"
            fullWidth
            value={newStudent.group}
            onChange={(e) => setNewStudent({ ...newStudent, group: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Username"
            fullWidth
            value={newStudent.username}
            onChange={(e) => setNewStudent({ ...newStudent, username: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Password"
            fullWidth
            value={newStudent.password}
            onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddStudent} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Student Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          {currentStudent && (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="First Name"
                fullWidth
                value={currentStudent.firstName}
                onChange={(e) => setCurrentStudent({ ...currentStudent, firstName: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Last Name"
                fullWidth
                value={currentStudent.lastName}
                onChange={(e) => setCurrentStudent({ ...currentStudent, lastName: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Group"
                fullWidth
                value={currentStudent.group}
                onChange={(e) => setCurrentStudent({ ...currentStudent, group: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Username"
                fullWidth
                value={currentStudent.username}
                onChange={(e) => setCurrentStudent({ ...currentStudent, username: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Password"
                fullWidth
                value={currentStudent.password}
                onChange={(e) => setCurrentStudent({ ...currentStudent, password: e.target.value })}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditStudent} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Data;
