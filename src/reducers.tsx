import { combineReducers } from "redux";
import { Action } from "redux";
import {
  SET_DEPARTMENTS,
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  SET_SELECTED_DEPARTMENT,
  ADD_DEPARTMENT,
} from "./actions";

interface Employee {
  id: number;
  name: string;
  designation: string;
  branch: string;
}

interface Department {
  deptName: string;
  manager: string;
  employeeDetails: Employee[];
}

interface RootState {
  departments: Department[];
  selectedDepartmentIndex: number | null;
}

const initialState: RootState = {
  departments: [],
  selectedDepartmentIndex: null,
};

const departmentsReducer = (
  state = initialState.departments,
  action: Action & { payload: any },
): Department[] => {
  switch (action.type) {
    case SET_DEPARTMENTS:
      return action.payload;
    case ADD_EMPLOYEE:
      return state.map((department, index) => {
        if (index === action.payload.departmentIndex) {
          const newEmployee = action.payload.newEmployee;
          const updatedEmployeeDetails = [
            ...department.employeeDetails,
            newEmployee,
          ];
          const updatedEmployeeDetailsWithIDs = updateEmployeeIds(
            updatedEmployeeDetails,
          );
          return {
            ...department,
            employeeDetails: updatedEmployeeDetailsWithIDs,
          };
        }
        return department;
      });

    case DELETE_EMPLOYEE:
      return state.map((department, index) => {
        if (index === action.payload.departmentIndex) {
          const updatedEmployeeDetails = department.employeeDetails.filter(
            (employee, i) => i !== action.payload.employeeIndex,
          );
          const updatedEmployeeDetailsWithIDs = updatedEmployeeDetails.map(
            (employee, i) => ({
              ...employee,
              id: i + 1, // Update ID
            }),
          );

          return {
            ...department,
            employeeDetails: updatedEmployeeDetailsWithIDs,
          };
        }
        return department;
      });
    case ADD_DEPARTMENT:
      return [
        ...state,
        {
          deptName: action.payload.departmentName,
          manager: action.payload.managerName,
          employeeDetails: [],
        },
      ];

    default:
      return state;
  }
};

const updateEmployeeIds = (employees: Employee[]) => {
  return employees.map((employee, index) => ({
    ...employee,
    id: index + 1,
  }));
};

const selectedDepartmentReducer = (
  state = initialState.selectedDepartmentIndex,
  action: Action & { payload: any },
): number | null => {
  switch (action.type) {
    case SET_SELECTED_DEPARTMENT:
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  departments: departmentsReducer,
  selectedDepartmentIndex: selectedDepartmentReducer,
});

export default rootReducer;
export type { RootState };