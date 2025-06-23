import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  id!: number;
  existingEmployee: Employee = new Employee();

  constructor(private employeeService: EmployeeService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getEmployee();
  }

  getEmployee(){
    this.employeeService.getEmployee(this.id).subscribe(data =>{
      this.existingEmployee = data;
    },
    error => console.log(error)
    );
  }

  goToEmployeeList(){
    this.router.navigate(['/employees']);
  }


}
