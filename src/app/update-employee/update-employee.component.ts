import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {


  id!: number;
  existingEmployee: Employee = new Employee();

  updateEmployeeForm = new FormGroup(
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

  constructor(private employeeService: EmployeeService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getEmployee();
  }

  onSubmit(){
    // this.existingEmployee = this.updateEmployeeForm.value;

    this.existingEmployee = {
      empId: 0,
      empName : this.updateEmployeeForm.controls['empName'].value,
      empPhoneNumber : this.updateEmployeeForm.controls['empPhoneNumber'].value,
      empEmail : this.updateEmployeeForm.controls['empEmail'].value,
      joinDate : this.updateEmployeeForm.controls['joinDate'].value,
      empAddress : {
        street : this.updateEmployeeForm.controls['street'].value,
        cityName : this.updateEmployeeForm.controls['cityName'].value,
        stateName : this.updateEmployeeForm.controls['stateName'].value,
      }
    }

    this.updateEmployee();
  }

  updateEmployee(){
    this.employeeService.putEmployee(this.id, this.existingEmployee).subscribe(data => {
      console.log(data);
      this.goToEmployeeList();
    },
    error => console.log(error)
    );
  }

  getEmployee(){
    this.employeeService.getEmployee(this.id).subscribe(data =>{
      this.existingEmployee = data;

      /*Object.keys(this.updateEmployeeForm.controls).forEach(key => {
        this.updateEmployeeForm.controls[key].setValue(this.existingEmployee.`$(key`);
      })*/

      this.updateEmployeeForm.controls['empName'].setValue(this.existingEmployee.empName);
      this.updateEmployeeForm.controls['empPhoneNumber'].setValue(this.existingEmployee.empPhoneNumber);
      this.updateEmployeeForm.controls['empEmail'].setValue(this.existingEmployee.empEmail);
      this.updateEmployeeForm.controls['joinDate'].setValue(this.existingEmployee.joinDate);
      this.updateEmployeeForm.controls['street'].setValue(this.existingEmployee.empAddress.street);
      this.updateEmployeeForm.controls['cityName'].setValue(this.existingEmployee.empAddress.cityName);
      this.updateEmployeeForm.controls['stateName'].setValue(this.existingEmployee.empAddress.stateName);

    },
    error => console.log(error)
    );
  }


  goToEmployeeList(){
    this.router.navigate(['/employees']);
  }

}
