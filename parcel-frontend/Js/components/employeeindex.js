export default function EmployeeIndex(employeelist){
    console.log("employee Index")
    function getRequest(location, callback){
        fetch(location)
        .then(response => response.json())
        .then(jsonData => callback(jsonData))
        .catch(err => console.log(err))
    }
    return `
    <h1>Employee Index</h1>
    <employees>
    <employee style="font-weight: 800; background-color: rgb(120, 161, 182)">    
    <names>
            <fname></fname>
            <lname>Name</lname>
            </names>
            <address>Address</address>
            <pn>Phone Number</pn>
            <email>Email</email>
            <roleId>Role Id</roleId>
            <employeebuttons></employeebuttons>
        </employee>
        ${employeelist.map(employee => {
            getRequest('https://localhost:44390/api/role/'+employee.roleId,
    roletoname=> {
    document.getElementById(employee.employeeId).innerHTML = roletoname.roleName;
    })
        return `  
        
            <employee>
            <names>
            <lname>${employee.lastName} ,</lname>
            <fname>${employee.firstName}</fname>
            </names>
            <address>${employee.address}</address>
            <pn>${employee.phoneNumber}</pn>
            <email>${employee.email}</email>
            <roleId id='${employee.employeeId}'>
            <input id='roleidtoname' type="hidden" value="${employee.roleId}">
            </roleId>
            <employeebuttons>
            <button class="edit_employee multibutton">Edit 
            <input class="employee_id" type="hidden" value="${employee.employeeId}"> 
            </button> 
            <button class="delete_employee_submit multibutton">Delete 
            <input class="delete_employee_id" type="hidden" value="${employee.employeeId}">
            </button> 
            <button class="single_employee_submit multibutton">Select
            <input class="single_employee_id" type="hidden" value="${employee.employeeId}"> 
            </button>
            </employeebuttons>
            </employee>
            `      
        })     

        .join("")
    }
        
        </employees>
        `
}

