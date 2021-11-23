import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Employee} from './employee';
import { EmployeeService } from './employee.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  
  public employees : Employee[];
  public editEmployee : Employee;
  public deleteEmployee :  Employee;

  // Inject employee service in  app module 
  constructor(private employeeService:EmployeeService){}

    ngOnInit(){
      this.getEmployees();
    }

    public getEmployees() : void {
      this.employeeService.getEmployee().subscribe(
        (response:Employee[])=>{
          this.employees =  response;
        },
        (error: HttpErrorResponse)=>{
          alert(error.message);
        }
        
        );
    }

    public onOpenModal(employee: Employee, mode: string): void {
      const container = document.getElementById('main-container');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      if (mode === 'add') {
        button.setAttribute('data-target', '#addEmployeeModal');
      }
      if (mode === 'edit') {
        this.editEmployee = employee;
        // edit button need id which is selected 
        button.setAttribute('data-target', '#updateEmployeeModal');
      }
      if (mode === 'delete') {
        this.deleteEmployee = employee;
        button.setAttribute('data-target', '#deleteEmployeeModal');
      }
      container?.appendChild(button);
      button.click();
    }


    /**
     * This function will add the employee 
     * @param addForm : ngform with same name defined in html 
     */
    public onAddEmployee(addForm:NgForm):void{
      // ng model for data is in ngform.value
        this.employeeService.addEmployee(addForm.value).subscribe(
          (response:Employee)=>{
            console.log(response);
            // close add module popup
            document.getElementById('add-employee-form').click();
            this.getEmployees();
            // This will reset entry form
            addForm.reset();
          },
          (error: HttpErrorResponse)=>{
            alert(error.message);
            addForm.reset();
          }
          
          );
    }
    
     /**
     * This function will update the employee 
     * @param addForm : ngform with same name defined in html 
     */
      public onupdateEmployee(employee: Employee):void{
        // ng model for data is in ngform.value
          this.employeeService.updateEmployee(employee).subscribe(
            (response:Employee)=>{
              console.log(response);
              this.getEmployees();
            },
            (error: HttpErrorResponse)=>{
              alert(error.message);
            }
            
            );
      }

      
     /**
     * This function will update the employee 
     * @param addForm : ngform with same name defined in html 
     */
      public ondeleteEmployee(employeeId: number):void{
        // ng model for data is in ngform.value
          this.employeeService.deleteEmployee(employeeId).subscribe(
            (response:void)=>{
              console.log(response);
              this.getEmployees();
            },
            (error: HttpErrorResponse)=>{
              alert(error.message);
            }
            
            );
      }

      /**
       * This will search employee 
       * @param key 
       */
      public searchEmployee(key: String) :void {
        // initialise employee 
        const results: Employee[] = [];
        
        for (const employee of this.employees) {

            if(employee.name.toLowerCase().indexOf(key.toLowerCase()) !==-1
              || employee.email.toLowerCase().indexOf(key.toLowerCase()) !==-1
              || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !==-1
              || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase())!==-1){
              results.push(employee);
            }
        }
        this.employees = results;
        // if there is no any employee then it call the function to get all employee list
        if(results.length ==0 || !key){
            this.getEmployees();
        }
      }


}
