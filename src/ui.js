export class UI {
    constructor(){
        this.employeelist = document.getElementById("employees");
        this.updateButton = document.getElementById("update");
        this.nameInput = document.getElementById("name");
        this.departmentInput = document.getElementById("department");
        this.salaryInput = document.getElementById("salary");
    }

    addAllEmployeeUI(employees){
        let result="";
          employees.forEach((employee)=>{
            result += `<tr>
                                                
            <td>${employee.name}</td>
            <td>${employee.department}</td>
            <td>${employee.salary}</td>
            <td>${employee.id}</td>
            <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
            <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
        </tr>`;
          });
          this.employeelist.innerHTML = result;
        }
        
        filterEmployeeUI(array){
            let employeecount = this.employeelist.childElementCount;
            let arraycount= array.length;
            let counter=0;
            const list= [];
            for(let x=0;x<arraycount;x++){
              for(let i=0;i<employeecount;i++){
                if(array[x] != i){
                  this.employeelist.childNodes[i].style.display="none";
                }
                else{
                  counter++;
                  list.push(array[x]);
                }
              }
            }
            if(counter>=2){
              for(let i=0;i<list.length;i++){
                let x=list[i];      
                this.employeelist.childNodes[x].style.display="table-row";
              }   
            }
          }
    clearInputs(){
        this.nameInput.value = "";
        this.departmentInput.value = "";
        this.salaryInput.value = "";
        
    }

    addEmployeeToUI(employee){
        
        this.employeelist +=  `<tr>
        <td>${employee.name}</td>
        <td>${employee.department}</td>
        <td>${employee.salary}</td>
        <td>${employee.id}</td>
        <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
        <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
        </tr>`;



    }

    deleteEmployeeFromUI(element){
        element.remove();
    }

    toggleUpdateButton(target){
        if(this.updateButton.style.display === 'none'){
            this.updateButton.style.display = 'block';
            this.addAllEmployeeInfoToInputs(target);
        }else{
            this.updateButton.style.display = 'none';
            this.clearInputs();
        }
    }

    addAllEmployeeInfoToInputs(target){
        const children = target.children;

        this.nameInput.value = children[0].textContent;
        this.departmentInput.value = children[1].textContent;
        this.salaryInput.value = children[2].textContent;
    }

    updateEmployeeOnUI(employee,parent){
        parent.innerHTML =`<tr>                                  
        <td>${employee.name}</td>
        <td>${employee.department}</td>
        <td>${employee.salary}</td>
        <td>${employee.id}</td>
        <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
        <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td></tr>
        `
      this.clearInputs();
      }
}