import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees!: Employee[];



  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    /*this.employees = [
      {
      name: "Tushar Verma",
      phoneNumber: 9610609177,
      email: "tushar@gmail.com"
    },
    {
      name: "Vaibhav Sharma",
      phoneNumber: 8171429110,
      email: "vaibahv@gmail.com"
    }
  ];*/

  this.getEmployees();

  }

  getEmployees(){
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
    });
  }

  deleteEmployeeById(empId: number){
    this.employeeService.deleteEmployee(empId).subscribe(data =>{
      console.log(data);
      this.getEmployees();
      // this.ngOnInit();
      alert("deleted successfully!");
    },
    error => console.log(error)
    );
  }

  goToUpdateEmployee(empId: number){
    this.router.navigate(['/update-employee', empId]);
  }

  goToEmployeeDetails(empId: number){
    this.router.navigate(['/employee-details', empId]);
  }

}
