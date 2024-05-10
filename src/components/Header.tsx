import React, { useState } from "react";
import { Typography, Button, Modal, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from "../actions";
import { RootState } from "../reducers";

interface Field {
  fieldName: string;
  label: string;
}

const FIELD_NAMES: Field[] = [
  { fieldName: "name", label: "Name" },
  { fieldName: "designation", label: "Designation" },
  { fieldName: "branch", label: "Branch" },
];

interface Props {
  department: {
    deptName: string;
    manager: string;
    employeeDetails: {
      id: number;
      name: string;
      designation: string;
      branch: string;
    }[];
  };
  numberOfEmployees: number;
  manager: string;
}

const Header: React.FC<Props> = ({
  department,
  numberOfEmployees,
  manager,
}) => {
  const [open, setOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState<Record<string, string>>({});
  const dispatch = useDispatch();
  const selectedDepartmentIndex = useSelector(
    (state: RootState) => state.selectedDepartmentIndex,
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setEmployeeData({});
    setOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleAddEmployee = () => {
    if (
      !employeeData.name ||
      !employeeData.designation ||
      !employeeData.branch
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    const newEmployeeId =
      department.employeeDetails.length > 0
        ? department.employeeDetails[department.employeeDetails.length - 1].id +
          1
        : 1;
    const newEmployee = { id: newEmployeeId, ...employeeData };

    if (selectedDepartmentIndex !== null) {
      dispatch(addEmployee(selectedDepartmentIndex, newEmployee));
      handleClose();
    }
  };

  return (
    <div className="department-details">
      <Typography variant="h4" gutterBottom>
        {department.deptName}
      </Typography>
      <Typography variant="body1" gutterBottom>
        No of employees: {numberOfEmployees}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Manager: {manager}
      </Typography>
      <Button variant="contained" onClick={handleOpen}>
        Add Employee
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
          }}
        >
          <Typography variant="h6">Add Employee</Typography>
          {FIELD_NAMES.map(({ fieldName, label }) => (
            <TextField
              key={fieldName}
              name={fieldName}
              label={label}
              value={employeeData[fieldName] || ""}
              onChange={handleInputChange}
            />
          ))}
          <Button variant="contained" onClick={handleAddEmployee}>
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Header;
