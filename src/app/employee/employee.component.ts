import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private empservice:EmployeeService) { }

  @ViewChild(MatTable) table: MatTable<Employee>;

  employees: Employee[];
  cntEmployee:number;
  ngOnInit(): void {
    this.empservice.retrieveEmployeeData().subscribe(a=>{
      this.employees = a;
      this.cntEmployee = this.employees.length;
    });

    this.addEmployeeForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      salary: new FormControl(null, [Validators.maxLength(6), Validators.pattern('^(0|[1-9][0-9]*)$')]),
      email: new FormControl(null, [Validators.email]),
    })

  }

  displayedColumns: string[] = ['id', 'name', 'email', 'customColumn1'];

  isHideAddEmployee:boolean = true;
  isEditEmployeeForm:boolean = false;
  addEmployeeForm:FormGroup;
  editId:number;

  onDisplayAddEmployee(){
    this.isHideAddEmployee = false;
    this.isEditEmployeeForm = false;
    this.addEmployeeForm.reset();
  }

  onSubmitAddEmployee(){

    if (this.isEditEmployeeForm) {
      // edit
      let editemp:Employee = this.employees.find(a=>a.id == this.editId);
      if (editemp != undefined) {
        editemp.name = this.addEmployeeForm.get('name').value;
        editemp.salary = this.addEmployeeForm.get('salary').value;
        editemp.email = this.addEmployeeForm.get('email').value;

        let aa: any = this.empservice.editEmployee(editemp);

        this.table.renderRows();

        alert('Employee updated successfully!');

      }
    } else{
      // add
      this.cntEmployee = this.cntEmployee + 1;
      let newEmp:Employee = new Employee(
        this.cntEmployee,
        this.addEmployeeForm.get('name').value,
        this.addEmployeeForm.get('salary').value,
        this.addEmployeeForm.get('email').value,
        null
      );

      let aa: any = this.empservice.addEmployee(newEmp);

        this.employees.push(newEmp);
        this.table.renderRows();

        alert('Employee added successfully!')
    }

    this.addEmployeeForm.reset();

  }

  onDeleteEmployee(id:number){
    this.empservice.deleteEmployee(id);

    let idx = this.employees.findIndex(a=>a.id == id);

    if (confirm('Are you sure want to delete this record?')) {
      this.employees.splice(idx, 1);
      this.table.renderRows();
    }
  }

  onEditEmployee(id:number){
    let emp:Employee = this.employees.find(a=>a.id == id);
    if (emp != undefined) {
      this.isHideAddEmployee = false;
      this.isEditEmployeeForm = true;

      this.addEmployeeForm.reset();
      this.editId = id;
      this.addEmployeeForm.controls['name'].setValue(emp.name);
      this.addEmployeeForm.controls['salary'].setValue(emp.salary);
      this.addEmployeeForm.controls['email'].setValue(emp.email);
    }
  }

}
