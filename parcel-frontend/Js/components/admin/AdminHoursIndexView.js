export default function AdminHoursIndex(hourslist){
    console.log("Hours Index")
    var i = 1;
    return `
    <h1>Hours Index</h1>
    <hours>
    <hour style="font-weight: 800; background-color: rgb(120, 161, 182)">    
        <dates>
            <dateworked> Date Worked </dateworked>
            <timein> Time In </timein>
            <timeout> Time Out </timeout>
        </dates>
            <totalhours> Total Hours </totalhours>
            <approved> Approved </approved>
            <hoursbuttons></hoursbuttons>
    </hour>
        ${hourslist.map(hours => {
        var x = "";
        i += 1;
        if(i % 2 === 0){x = 'green'}else{x='blue'}
        return `  
    <employee class='${x}'>
        
            <dates>
                <dateworked> ${hours.timeIn.substring(0, 10)}</dateworked>
                <timein> ${hours.timeIn.substring(11, 19)}</timein>
                <timeout> ${hours.timeOut.substring(11, 19)}
                </timeout>
            </dates>
                <totalhours> ${hours.totalHours} </totalhours>
                <approved> ${hours.approved} </approved>
                
                <hoursbuttons>
                <button class="edit_hours multibutton">Edit 
                        <input class="hours_id" type="hidden" value="${hours.hoursId}"> 
                    </button> 
                    <button class="delete_hours_submit multibutton">Delete 
                        <input class="delete_hours_id" type="hidden" value="${hours.hoursId}"> 
                    </button> 
                    <button class="single_hours_submit multibutton">Select
                        <input class="single_hours_id" type="hidden" value="${hours.hoursId}"> 
                    </button>
            
                </hoursbuttons>
         
        </employee>
         
        `      
        })     
        .join("")}
        
    </hours>
    `
}
