import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from '../address';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  newEmployee: Employee = new Employee();

  newEmployeeForm = new FormGroup(
    {
      empName: new FormControl('',Validators.required),
      empPhoneNumber: new FormControl('',Validators.required),
      empEmail: new FormControl('',Validators.required),
      joinDate: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      cityName: new FormControl('', Validators.required),
      stateName: new FormControl('', Validators.required)
    }
  );

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    /*console.log(this.newEmployeeForm.value);
    // console.log(this.newEmployeeForm.get('name').value);
    console.log(this.newEmployeeForm.controls['empName'].value);*/

    // this.newEmployee = this.newEmployeeForm.value;

    this.newEmployee = {
      empId: 0,
      empName : this.newEmployeeForm.controls['empName'].value,
      empPhoneNumber : this.newEmployeeForm.controls['empPhoneNumber'].value,
      empEmail : this.newEmployeeForm.controls['empEmail'].value,
      joinDate : this.newEmployeeForm.controls['joinDate'].value,
      empAddress : {
        street : this.newEmployeeForm.controls['street'].value,
        cityName : this.newEmployeeForm.controls['cityName'].value,
        stateName : this.newEmployeeForm.controls['stateName'].value,
      }
    }

    // console.log(this.newEmployee);
    this.saveEmployee();

  }

  saveEmployee(){
    this.employeeService.postEmployee(this.newEmployee).subscribe(data => {
      console.log(data);
      this.goToEmployeeList();
    },
    error => console.log(error)
    );
  }

  goToEmployeeList(){
    this.router.navigate(['/employees']);
  }

}
