import {Request} from "./request";
import {UI} from "./ui";


//ELEMENTLERİ SEÇME

const form = document.getElementById('employee-form');
const nameInput = document.getElementById('name');
const departmentInput = document.getElementById('department');
const salaryInput = document.getElementById('salary');
const employeesList = document.getElementById('employees');
const update = document.getElementById('update');
const filter = document.getElementById('filter');
const clearall = document.getElementById('clear-all');

const request = new Request('http://localhost:3000/employees');
const ui = new UI();

let updateState = null;

// request.get()
// .then(employees => console.log(employees))
// .catch(err => console.log(err));

// request.post({name:"Selinsu Sever",department:"Halkla İlişkiler",salary:3500})
// .then(employee => console.log(employee))
// .catch(err =>console.log(err));

// request.put(1,{name:"Eren Atalay",department:"Bilişim Ceo",salary:4500})
// .then(employee => console.log(employee))
// .catch(err => console.log(err));

// request.delete(4)
// .then(message => console.log(message))
// .catch(err => console.log(err));

eventListeners();



function eventListeners(){
    
    document.addEventListener("DOMContentLoaded",getAllEmployees);
    form.addEventListener('submit',addEmployee);
    employeesList.addEventListener('click',UpdateOrDelete);
    update.addEventListener('click',updateEmployee);
    filter.addEventListener('input',filterMethod);
    clearall.addEventListener('click',clearAllEmployees);
}

function clearAllEmployees(e){
    let count = employeesList.childNodes.length;

    for(let i=0;i<count;i++){
        request.delete(Number(employeesList.childNodes[i].children[3].textContent));
    }

    for(let i=0;i<count;i++){
        employeesList.firstChild.remove();
    }

    e.preventDefault();
}


function filterMethod(){
    let count = employeesList.childNodes.length;
    const lower=filter.value.toLowerCase();
    const  array = [];


        for(let i=0;i<count;i++){
            if(lower == employeesList.childNodes[i].children[0].textContent.toLowerCase() || lower == employeesList.childNodes[i].children[1].textContent.toLowerCase()
                || lower ==employeesList.childNodes[i].children[2].textContent){
                    array.push(i); 
                }
                else{
                    employeesList.childNodes[i].style.display="table-row";
                }
        }
        if(array.length>0){
            ui.filterEmployeeUI(array);
        }
}

function getAllEmployees(){
    request.get()
    .then(employees => {
        ui.addAllEmployeeUI(employees);
    })
    .catch(err => console.log(err));
}

function addEmployee(e){

    const employeeName = nameInput.value.trim();
    const employeeDepartment = departmentInput.value.trim();
    const employeeSalary = salaryInput.value.trim();

    if (employeeName === '' || employeeDepartment === '' || employeeSalary === ''){
        alert('lütfen tüm alanları doldur');
    }
    else{
        let data ={
            name:employeeName,
            department:employeeDepartment,
            salary : Number(employeeSalary)
        };
        request.post(data)
        .then(employee => {
            ui.addEmployeeToUI(employee);
        })
        .catch(err =>console.log(err));
    }
    ui.clearInputs();
    e.preventDefault();
}

function UpdateOrDelete(e){
    if(e.target.id === 'delete-employee'){
        //silme
        deleteEmployee(e.target);
    }
    else if (e.target.id === 'update-employee'){
        //güncelleme
        updateEmployeeController(e.target.parentElement.parentElement);
    }
}

function deleteEmployee(targetEmployee){
    const id = targetEmployee.parentElement.previousElementSibling.previousElementSibling.textContent;
    request.delete(id)
    .then(message => {
        ui.deleteEmployeeFromUI(targetEmployee.parentElement.parentElement);
    })
    .catch(err=>console.log(err));
}

function updateEmployeeController(targetEmployee){
    ui.toggleUpdateButton(targetEmployee);

    if(updateState === null){
        updateState = {
            updateId : targetEmployee.children[3].textContent,
            updateParent : targetEmployee
        }
    }else{
        updateState = null;
    }
}

function updateEmployee(){

    if(updateState){
        const data={name:nameInput.value.trim(),department:departmentInput.value.trim(),
        salary:salaryInput.value.trim()};

        request.put(updateState.updateId,data)
        .then( updatedEmployee =>{
            ui.updateEmployeeOnUI(updatedEmployee,updateState.updateParent);
            updateState=null;
        })
        .catch(err => console.log(err));
   
    }
    update.style.display="none";




}

