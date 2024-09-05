
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})


export class EmployeeComponent implements OnInit {
  employees: any[] = [];
  employeeForm: any = { id: null, firstname: '', lastname: '', email: '' };
  editing = false;
  isModalVisible = false;  // Add this line

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  showEmployeeForm(employee?: any): void {
    if (employee) {
      this.employeeForm = {...employee};
      this.editing = true;
    } else {
      this.resetForm();
      this.editing = false;
    }
    this.isModalVisible = true;  // Set the flag to true when showing the form
  }

  saveEmployee(): void {
    if (this.editing) {
      this.employeeService.updateEmployee(this.employeeForm).subscribe(() => {
        this.loadEmployees();
        this.closeModal();  // Close the modal on save
      });
    } else {
      this.employeeService.addEmployee(this.employeeForm).subscribe(() => {
        this.loadEmployees();
        this.closeModal();  // Close the modal on save
      });
    }
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.loadEmployees();
    });
  }

  resetForm(): void {
    this.employeeForm = { id: null, firstname: '', lastname: '', email: '' };
  }

  closeModal(): void {
    this.isModalVisible = false;  // Set the flag to false to hide the modal
    this.resetForm();
  }
}

