export const SET_DEPARTMENTS = "SET_DEPARTMENTS";
export const ADD_EMPLOYEE = "ADD_EMPLOYEE";
export const DELETE_EMPLOYEE = "DELETE_EMPLOYEE";
export const SET_SELECTED_DEPARTMENT = "SET_SELECTED_DEPARTMENT";
export const ADD_DEPARTMENT = "ADD_DEPARTMENT";

export const setDepartments = (departments: any) => ({
  type: SET_DEPARTMENTS,
  payload: departments,
});

export const addEmployee = (departmentIndex: number, newEmployee: any) => ({
  type: ADD_EMPLOYEE,
  payload: {
    departmentIndex,
    newEmployee,
  },
});

export const deleteEmployee = (
  departmentIndex: number,
  employeeIndex: number,
) => ({
  type: DELETE_EMPLOYEE,
  payload: {
    departmentIndex,
    employeeIndex,
  },
});

export const setSelectedDepartment = (index: number) => ({
  type: SET_SELECTED_DEPARTMENT,
  payload: index,
});

export const addDepartment = (departmentName: string, managerName: string) => ({
  type: ADD_DEPARTMENT,
  payload: {
    departmentName,
    managerName,
  },
});