import ApiAction from "./api/api-actions"

import AdminEmployeeIndex from "./components/admin/AdminEmployeeIndexView"
import AdminAddEmployee from "./components/admin/AdminAddEmployee"
import AdminEditEmployee from "./components/admin/AdminEditEmployee"
import AdminCurrentHoursIndex from "./components/admin/AdminHoursCurrentIndexView"
import AdminPastHoursIndex from "./components/admin/AdminHoursPastIndexView"
import AdminAddHours from "./components/admin/AdminAddHours"
import AdminSingleEmployee from "./components/admin/AdminSingleEmployee"

import UserCurrentHoursIndex from "./components/user/UserHoursCurrentIndexView"
import UserPastHoursIndex from "./components/user/UserHoursPastIndexView"
import UserSingleEmployee from "./components/user/UserSingleEmployee"
import UserEditProfile from "./components/user/UserEditProfile"

import EmployeeAddHours from "./components/employeeaddhours"
import EmployeeTimeClock from "./components/user/EmployeeTimeClock";
import Home from "./components/home";


pageBuild();

function pageBuild(){
  getAdminEmployeeIndex();
  getAdminAddEmployee();
  getAdminEditEmployee();
  getAdminHoursIndex();

  getAdminAddHours();
  getAdminSingleEmployee();
  
  adminAddEmployee();
  adminEditEmployee();
  adminDeleteEmployee();
  adminAddHours();
  adminApproveHours();
 
  getUserSingleEmployee();
  getUserEditProfile();
  getUserHoursIndex();
  getEmployeeTimeClock();

  userEditProfile();
  userEditCancel();
  
  logOut();
  editCancel();
  returnIndex();
  clockIn();
  clockOut();
  viewByDateRange();
  searchByLastName();
  adminCurrentHours();
  userCurrentHours();
  
}

const app = document.getElementById('main');

//function LogIn(){
  var logged_id = null; //id of person currently logged in (or null if nobody)
  document.getElementById('main').addEventListener('click', function(){
    // when person clicks clock_in or clock_out, send information to API
    if(event.target.id == 'clock_in') {
      console.log("https://localhost:44390/api/employee/clock_in/"+logged_id);
      ApiAction.getRequest("https://localhost:44390/api/employee/clock_in/"+logged_id);
    }
    else if(event.target.id == 'clock_out') {
      ApiAction.getRequest("https://localhost:44390/api/employee/clock_out/"+logged_id);
    }
    else if(event.target.classList.contains("adminlogin")){
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      console.log('test');
      document.getElementById('invalid').innerHTML = "Invalid Username or Password"
      ApiAction.getRequest("https://localhost:44390/api/employee/login/"+username+"/"+password, auth => {
        console.log(auth);
        if (auth.ssn === password){
          document.getElementById('nav').style = 'display: flex; justify-content: flex-end;'
          if (auth.admin === true){
          document.getElementById('hidenav').style.display = 'block'
          document.getElementById('nav').style = 'display: flex; background-color: rgb(78, 12, 28)'
          }
          document.getElementById('mainnav').style.display = 'flex'
          document.getElementById('main').innerHTML = Home(auth);
          document.getElementById('mainnav').innerHTML = `
          <n class="empprofile">Profile
          <input type="hidden" class="getprofile" value="${auth.employeeId}">
          </n>
          <n class="emptimeclock">Time Clock
          <input type="hidden" class="gettimeclock" value="${auth.employeeId}">
          </n>
          <n class="empcurrenthours">Current Pay-Period
          <input type="hidden" class="getcurrenthours" value="${auth.employeeId}">
          </n>
          <n class="emppasthours" value="${auth.employeeId}">Past Pay-Period
          <input type="hidden" class="gethours" value="${auth.employeeId}">
          </n>
          <n class="logout">Log Out
          <input type="hidden" class="logout_submit"></n>
          `

          logged_id = auth.employeeId; //after a successful login, save ID of logged in employee
        }    
      })
    }
  })
//}

//List Employees
function getAdminEmployeeIndex(){
  const employeeindex = document.getElementById('Nav_employee_index');
  employeeindex.addEventListener('click', function(){
    ApiAction.getRequest("https://localhost:44390/api/employee", employeelist => {
    console.log("admin version")
      app.innerHTML = AdminEmployeeIndex(employeelist);
    })
  })
};

//Add Employee Functions
function getAdminAddEmployee() {

  document.getElementById('Nav_add_employee').addEventListener('click', function(){
    console.log("admin version")
    AdminAddEmployee();  // capital-a AdminAddEmployee
  })
}

function adminAddEmployee(){
  document.getElementById('main').addEventListener('click', function() {
    if (event.target.classList.contains('add_employee_submit')){
      console.log("i");
      const employeeId = 0;
      const firstName = document.querySelector('.add_employee_first_name').value;
      const lastName = document.querySelector('.add_employee_last_name').value;
      const address = document.querySelector('.add_employee_address').value;
      const phoneNumber = document.querySelector('.add_employee_phone_number').value;
      const ssn = document.querySelector('.add_employee_ssn').value;
      const birthdate = document.querySelector('.add_employee_birthdate').value;
      const email = document.querySelector('.add_employee_email').value;
      const roleId = document.querySelector('#role_select').value;
      const admin = document.querySelector('#admin_select').value;
      const data = {
        employeeId: employeeId,
        phoneNumber: phoneNumber,
        roleId: roleId,
        firstName: firstName,
        lastName: lastName,
        address: address,
        ssn: ssn,
        birthdate: birthdate,
        email: email,
        admin: admin,
      };
    
      ApiAction.postRequest('https://localhost:44390/api/employee', data,
      employeelist=> {
        console.log("admin add function version")
        app.innerHTML = AdminEmployeeIndex(employeelist);
      })
    }
  })
}

//Edit Employee Functions
function getAdminEditEmployee() {
  document.getElementById('main').addEventListener('click', function(){
    if(event.target.classList.contains("admin_edit_employee")){
      const employeeId = event.target.querySelector(".edit_employee_id").value
      console.log(employeeId)
      ApiAction.getRequest("https://localhost:44390/api/employee/" + employeeId, employee=> {
        console.log("admin version")
      AdminEditEmployee(employee)})
    }
  })
}

function adminEditEmployee(){
  document.getElementById('main').addEventListener('click', function() {
    if (event.target.classList.contains('edit_employee_submit')){
    console.log("i");
    const employeeId = document.querySelector('.edit_employee_id').value;
    const roleId = document.querySelector('#role_select').value;
    const firstName = document.querySelector('.edit_employee_first_name').value;
    const lastName = document.querySelector('.edit_employee_last_name').value;
    const address = document.querySelector('.edit_employee_address').value;
    const phoneNumber = document.querySelector('.edit_employee_phone_number').value;
    const ssn = document.querySelector('.edit_employee_ssn').value;
    const birthdate = document.querySelector('.edit_employee_birthdate').value;
    const email = document.querySelector('.edit_employee_email').value;
    const admin = document.querySelector('#admin_select').value;
    
    const data = {
      employeeId: employeeId,
      phoneNumber: phoneNumber,
      roleId: roleId,
      firstName: firstName,
      lastName: lastName,
      address: address,
      ssn: ssn,
      birthdate: birthdate,
      email: email,
      admin: admin
    };
   
      ApiAction.putRequest('https://localhost:44390/api/employee', data,
      employeelist=> {
        console.log("admin version")
        app.innerHTML = AdminEmployeeIndex(employeelist);
      })
    }
  })
}

//Edit Cancel Button
function editCancel(){
  document.getElementById('main').addEventListener('click', function(){
    if(event.target.classList.contains('cancel_edit_submit'))
      ApiAction.getRequest("https://localhost:44390/api/employee", employeelist => {
      app.innerHTML = AdminEmployeeIndex(employeelist);
    })
  })
}

//Delete Employee Functions
function adminDeleteEmployee(){
  document.getElementById('main').addEventListener('click', function() {
    if (event.target.classList.contains('admin_delete_employee_submit')){
      const employeeId = event.target.querySelector('.delete_employee_id').value;
      const data = {
        employeeId: employeeId
      }

      var result = confirm("Are you sure you want to delete this employee?");
      if (result) {
        ApiAction.deleteRequest('https://localhost:44390/api/employee', data, employeelist=> {
          console.log("admin version")
          app.innerHTML = AdminEmployeeIndex(employeelist);
        })
      }
    }
  })
}

//View a Single Employee
function getAdminSingleEmployee(){
  document.getElementById('main').addEventListener('click', function() {
    if (event.target.classList.contains('single_employee_submit')){
    const employeeId = event.target.querySelector('.single_employee_id').value;
     
      ApiAction.getRequest('https://localhost:44390/api/employee/' + employeeId, 
        employee=> {
          console.log("admin version")
        app.innerHTML = AdminSingleEmployee(employee);
      })
    }
  })  
}

//Return to Index Button in Single Employee Page
function returnIndex(){
  document.getElementById('main').addEventListener('click', function(){
    if(event.target.classList.contains('return_employee_submit'))

      ApiAction.getRequest("https://localhost:44390/api/employee", employeelist => {
      app.innerHTML = AdminEmployeeIndex(employeelist);
    })
  })
}

//hours based
//Gets all Hours
function getAdminHoursIndex(){
  const hoursindex = document.getElementById('PastPay');
  hoursindex.addEventListener('click', function(){
    ApiAction.getRequest('https://localhost:44390/api/hours', hourslist => {
      console.log("hourslist.reverse")
      console.log(hourslist.reverse());
      sortAdminViewUserHours(hourslist);
      console.log("!!!!!!!!!getAdminHoursIndex!!!!!!!!!");
      console.log(hourslist);
      app.innerHTML = AdminPastHoursIndex(hourslist);
    })
  })
}

//sortadminviewuserhours
//sort user hours function
function sortAdminViewUserHours(hourslist){
  console.log("just before admin sort function fires");
  const sortedHours = hourslist.sort((a, b) => new Date(b.timeIn) - new Date(a.timeIn));
  //const sortedHours = hours.sort((a, b) => b.timeIn - a.timeOut);
  console.log("sorted admin view hours=");
  console.log(sortedHours);

}

//Admin Add Hours
function getAdminAddHours(){
  document.getElementById('Nav_add_hours').addEventListener('click', function(){
    console.log("admin version")
    AdminAddHours();
  })
}

function adminAddHours(){
  document.getElementById('main').addEventListener('click', function() {
    if (event.target.classList.contains('add_employee_hours_submit')){

      const hoursId = 0;
      const employeeId = document.querySelector('#employee_select').value
      const timeInUtc = new Date(document.querySelector('.add_hours_time_in').value).toISOString()
      console.log(timeInUtc)
      const timeOutUtc = new Date(document.querySelector('.add_hours_time_out').value).toISOString()
      console.log(timeOutUtc)
      const totalHours = converthours(timeOutUtc, timeInUtc);
      const timeIn = new Date(timeInUtc)
      const timeOut = new Date(timeOutUtc)
      console.log(totalHours);
      const approved = document.querySelector(".add_hours_approved").value;
      console.log(approved)

      const data = {
        HoursId: hoursId,
        EmployeeId: employeeId,
        
        TimeIn: timeIn,
        TimeOut: timeOut,
        TotalHours: totalHours,
        Approved: approved
      };
    
      ApiAction.postRequest('https://localhost:44390/api/hours', data,
      hourslist=> {
        ApiAction.getRequest("https://localhost:44390/api/hours", listhours=> {
          app.innerHTML = AdminCurrentHoursIndex(listhours)
        })
      })
    }
  })
}

//Converts Time in and Time out to display correctly
function converthours(timeOut,timeIn){
  console.log("timeOut"); console.log(timeOut);
  console.log("time in"); console.log(timeIn);

  var toDate = parseInt(new Date(timeOut).getTime()/1000)
  console.log(toDate);
  
  var fromDate = parseInt(new Date(timeIn).getTime()/1000)
  console.log(fromDate);
  
  var timeDiff = (toDate - fromDate)/3600;
  console.log(timeDiff);
  
  const timeRound = Math.abs(Math.round((timeDiff+.0499)*10)/10);
  console.log(timeRound)
  return timeRound;
}

function adminApproveHours(){
  document.getElementById('main').addEventListener('click', function() {
  if (event.target.classList.contains('approve_hours_submit')){

  const hoursId = event.target.querySelector('.single_hours_id').value
  const employeeId = event.target.querySelector('.singleemployee_hours_id').value
  const timeIn = event.target.querySelector('.time_in').value
  const timeOut = event.target.querySelector('.time_out').value
  const totalHours = event.target.querySelector('.total_hours').value;
  const data = {

    hoursId: hoursId,
    employeeId: employeeId,
    timeIn: timeIn,
    timeOut: timeOut,
    totalHours: totalHours,
    approved: true
  };

  ApiAction.putRequest('https://localhost:44390/api/hours', data,
  hourslist=> {
    app.innerHTML = AdminHoursIndex(hourslist);
  })
}
})
}

//User Functions Below
//Employee Based Function
//Views logged in Employee Profile from User Nav
function getUserSingleEmployee(){
  document.getElementById('mainnav').addEventListener('click', function() {
    if (event.target.classList.contains('empprofile')){
      const employeeId = event.target.querySelector('.getprofile').value;  
      console.log(employeeId);   
      ApiAction.getRequest('https://localhost:44390/api/employee/' + employeeId, 
        employee=> {

        app.innerHTML = UserSingleEmployee(employee);

        }
      )
    }
  })
}

function getUserEditProfile() {
  document.getElementById('main').addEventListener('click', function(){
    if(event.target.classList.contains("user_single_edit")){
      const employeeId = event.target.querySelector(".employee_id").value
      console.log(employeeId)
      ApiAction.getRequest("https://localhost:44390/api/employee/" + employeeId, employee=> {
        console.log("user version")
        app.innerHTML = UserEditProfile(employee)})
    }
  })
}

function userEditProfile(){
  document.getElementById('main').addEventListener('click', function() {
    if (event.target.classList.contains('user_edit_submit')){
      console.log("i");
      const employeeId = document.querySelector('.edit_employee_id').value;
      const roleId = document.querySelector('.user_roleId').value;
      const firstName = document.querySelector('.edit_employee_first_name').value;
      const lastName = document.querySelector('.edit_employee_last_name').value;
      const address = document.querySelector('.edit_employee_address').value;
      const phoneNumber = document.querySelector('.edit_employee_phone_number').value;
      const ssn = document.querySelector('.user_ssn').value;
      const birthdate = document.querySelector('.edit_employee_birthdate').value;
      const email = document.querySelector('.edit_employee_email').value;
      const admin = document.querySelector('.user_admin_status').value
      
      const data = {
        employeeId: employeeId,
        phoneNumber: phoneNumber,
        roleId: roleId,
        firstName: firstName,
        lastName: lastName,
        address: address,
        ssn: ssn,
        birthdate: birthdate,
        email: email,
        admin: admin
      };
      console.log(data)
    
      ApiAction.putRequest('https://localhost:44390/api/employee', data,
      employee=> {
        ApiAction.getRequest("https://localhost:44390/api/employee/" + employeeId, employee=> {
          app.innerHTML = UserSingleEmployee(employee)
        })
      })
    }
  })
}

function userEditCancel(){
  document.getElementById('main').addEventListener('click', function(){
    if(event.target.classList.contains('user_cancel_edit_submit'))
      ApiAction.getRequest("https://localhost:44390/api/employee/" + logged_id , singleView => {
      app.innerHTML = UserSingleEmployee(singleView);
    })
  })
}

//Hours Functions
function getUserHoursIndex() {
    document.getElementById('mainnav').addEventListener('click', function() {
      if (event.target.classList.contains('emppasthours')){
      const employeeId = event.target.querySelector('.gethours').value;

      console.log(employeeId);   
      ApiAction.getRequest('https://localhost:44390/api/hours/'+employeeId, 
        hours=> {
          console.log("just before call to sortUserHours")
          sortUserHours(hours);
         console.log("hours=")
         console.log(hours)
        app.innerHTML = UserPastHoursIndex(hours.reverse());
       
      })
}})  
}
//sort user hours function
function sortUserHours(hours){
  console.log("just before sort function fires");
  const sortedHours = hours.sort((a, b) => new Date(a.timeIn) - new Date(b.timeIn));
  //const sortedHours = hours.sort((a, b) => b.timeIn - a.timeOut);
  console.log("sorted hours=");
  console.log(sortedHours);
}

function getEmployeeTimeClock(){
  document.getElementById('mainnav').addEventListener('click', function() {
    if (event.target.classList.contains('emptimeclock')){
      const employeeId = event.target.querySelector('.gettimeclock').value;  
      console.log(employeeId);   
      ApiAction.getRequest('https://localhost:44390/api/employee/' + employeeId, 
        employee=> {
        app.innerHTML = EmployeeTimeClock(employee);
        }
      )
    }
  })
}


//Clock in 
function clockIn(){
  document.getElementById('main').addEventListener('click', function() {
    console.log(event.target.classList);
    //cory don't change the button request from clockin_submit and the button will work.

    if (event.target.classList.contains('clockin_submit')){
      console.log('clockin')
      var d = new Date()
      
      //d.toLocaleTimeString();
      const data = {
        HoursId: 0,
        EmployeeId: logged_id,
        TimeIn: d.toISOString(),  //d.getFullYear() + "-" + d.getMonth() + "-" + d.getDay() + " " +  d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(),
        TimeOut: d.toISOString(),  //d.getFullYear() + "-" + d.getMonth() + "-" + d.getDay() + " " +  d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(),
        TotalHours: 0,
        Approved: false
      }
      console.log(data);
      ApiAction.postRequest('https://localhost:44390/api/hours', data,
      // what does this do?
      clock => {   

      })
      alert("You have Clocked In.")
    }
  })
}

function clockOut(){
  document.getElementById('main').addEventListener('click', function() {
    if (event.target.classList.contains('clockout_submit')){
      console.log('clockout start')
      ApiAction.getRequest('https://localhost:44390/api/hours/collect/'+ logged_id, 
      targetHours=>{
        console.log(targetHours)
        console.log("get hours")
        var hoursId = targetHours.hoursId
        console.log(hoursId)
        var timeIn = targetHours.timeIn + "Z"
        console.log(timeIn)
        console.log("get hours complete")
                    
        var d = new Date().toISOString()
        console.log(d)
        
        console.log("start data conversion")
        const data = {
          HoursId: hoursId,
          EmployeeId: logged_id,
          TimeIn: timeIn,
          TimeOut: d,
          TotalHours: converthours(d, timeIn),
          Approved: false
        }
        console.log("end data conversion")
        console.log(data)
        ApiAction.putRequest('https://localhost:44390/api/hours', data,
        clock=> {
          
        })
        alert("You have Clocked Out.")
      })
    }
  })
}


//View Date Range on Admin Pay Index
function viewByDateRange(){
  document.getElementById('main').addEventListener('click', function() {
    if (event.target.classList.contains('getdaterange')) {
      const date1 = document.querySelector('.range_date1').value;
      const date2 = document.querySelector('.range_date2').value;
      ApiAction.getRequest('https://localhost:44390/api/hours/range/'+date1+"/"+date2, 
      daterange=> {
      app.innerHTML = AdminHoursIndex(daterange);}
      )
    }
  })
}

//search Hours by employee last name

function searchByLastName(){
document.getElementById('main').addEventListener('click', function() {
  if (event.target.classList.contains('searchbutton')) {

    const search = document.querySelector('.searchIn').value;
    //search on the value using the includes function on the lastname string.
    //if the search of last name is true then display that record
    ApiAction.getRequest('https://localhost:44390/api/hours', hourslist => {
      let matchinghourslist = [];
      app.innerHTML = AdminHoursIndex(matchinghourslist) 
      hourslist.map(hours => { 
        ApiAction.getRequest('https://localhost:44390/api/employee/'+ hours.employeeId,
          hourtoname=> {
            if (searchLastName(hourtoname.lastName,search)){
              matchinghourslist.push(hours);
              app.innerHTML = AdminHoursIndex(matchinghourslist) 
            }
        });
      });
    });

  }
})
}

      
 
function searchLastName(lastName, value){
  console.log(lastName);
  return lastName.toLowerCase().includes(value.toLowerCase());
}

function logOut() {
  document.getElementById('mainnav').addEventListener('click', function() {
    if (event.target.classList.contains('logout')){
    app.innerHTML = document.location.reload(true);
    }
})};

//Show Current Pay Period (Sun-Sat)
function adminCurrentHours(){
  const hoursindexcurrent = document.getElementById('CurrentPay');
  hoursindexcurrent.addEventListener('click', function(){
    ApiAction.getRequest('https://localhost:44390/api/hours/current', hourslist => {
      console.log("hourslist.reverse")
      console.log(hourslist.reverse());
      sortAdminViewUserHours(hourslist);
      app.innerHTML = AdminCurrentHoursIndex(hourslist);
    })
  })
}

//Show Current Pay Period (Sun-Sat)
function userCurrentHours(){
  document.getElementById('mainnav').addEventListener('click', function() {
    if (event.target.classList.contains('empcurrenthours')){
    const employeeId = event.target.querySelector('.getcurrenthours').value;
    console.log(employeeId);   
    ApiAction.getRequest('https://localhost:44390/api/hours/current/'+employeeId, 
      hours=> {
        console.log("just before call to sortUserHours")
        sortUserHours(hours);
       console.log("hours=")
       console.log(hours)
      app.innerHTML = UserCurrentHoursIndex(hours.reverse());
    })
}
})  
}

