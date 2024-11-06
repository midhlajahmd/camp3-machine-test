function logout() {
    window.location.href = "../html/login.html";
}

function backToForm() {
    document.getElementById('form').style.display = 'block';
    document.getElementById('view').style.display = 'none';
}

function viewRequest() {
    document.getElementById('form').style.display = 'none';
    document.getElementById('view').style.display = 'block';
    filterRequests(); 
}


function travelRequest(event) {
    event.preventDefault();
    const empID = document.getElementById('empID').value;
    const empName = document.getElementById('empName').value;
    const project = document.getElementById('project').value;
    const cause = document.getElementById('cause').value;
    const source = document.getElementById('source').value;
    const destination = document.getElementById('destination').value;
    const fromdate = document.getElementById('fromdate').value;
    const noofdays = parseInt(document.getElementById('noofdays').value, 10);
    const modeoftravel = document.getElementById('modeoftravel').value;


    const request = {
        id: new Date().getTime(),
        empID,
        empName,
        project,
        cause,
        source,
        destination,
        fromdate,
        noofdays,
        modeoftravel,
        status: 'Pending',
        priority: 'Normal'
    };


    let allRequests = JSON.parse(localStorage.getItem('travelRequests')) || [];
    allRequests.push(request);


    localStorage.setItem('travelRequests', JSON.stringify(allRequests));


    document.getElementById('requestForm').reset();
    alert("Request submitted successfully!");
    backToForm();
}


function filterRequests() {
    const statusFilter = document.getElementById('statusFilter').value; // Get selected status filter
    const allRequests = JSON.parse(localStorage.getItem('travelRequests')) || []; // Fetch all requests
    const viewTable = document.getElementById('viewTable');
    viewTable.innerHTML = '';  // Clear current table contents

    // Filter requests based on selected status
    allRequests
        .filter(request => statusFilter === "All" || request.status === statusFilter)  // Show all if "All" is selected
        .forEach((request) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${request.empName}</td>
                <td>${request.destination}</td>
                <td>
                    <select onchange="updatePriority(${request.id}, this.value)">
                        <option value="Normal" ${request.priority === 'Normal' ? 'selected' : ''}>Normal</option>
                        <option value="Critical" ${request.priority === 'Critical' ? 'selected' : ''}>Critical</option>
                    </select>
                </td>
                <td><span class="status-label ${getStatusClass(request.status)}">${request.status}</span></td>
                <td>
                    ${request.status === 'Pending' ? `<button onclick="editRequest(${request.id})">Edit</button>` : ''}
                </td>
            `;
            viewTable.appendChild(row);
        });
}

// Call filterRequests() to display all requests initially when the page loads
document.addEventListener("DOMContentLoaded", function() {
    filterRequests();
});

function getStatusClass(status) {
    switch(status) {
        case 'Approved': return 'approved';
        case 'Rejected': return 'rejected';
        case 'Pending': return 'pending';
        case 'On Hold': return 'onhold';
        default: return '';
    }
}

function updatePriority(requestId, newPriority) {
    let allRequests = JSON.parse(localStorage.getItem('travelRequests')) || [];
    const requestToUpdate = allRequests.find(request => request.id === requestId);

    if (requestToUpdate) {
        requestToUpdate.priority = newPriority;
        localStorage.setItem('travelRequests', JSON.stringify(allRequests));
        alert(`Priority updated to ${newPriority}`);
    }
}


function updatePriority(requestId, newPriority) {
    let allRequests = JSON.parse(localStorage.getItem('travelRequests')) || [];
    const requestToUpdate = allRequests.find(request => request.id === requestId);

    if (requestToUpdate) {
        requestToUpdate.priority = newPriority;
        localStorage.setItem('travelRequests', JSON.stringify(allRequests));
        alert(`Priority updated to ${newPriority}`);
    }
}

function getStatusClass(status) {
    switch(status) {
        case 'Approved': return 'approved';
        case 'Rejected': return 'rejected';
        case 'Pending': return 'pending';
        case 'On Hold': return 'onhold';
        default: return '';
    }
}

function editRequest(requestId) {
    const allRequests = JSON.parse(localStorage.getItem('travelRequests')) || [];
    const requestToEdit = allRequests.find(request => request.id === requestId);

    if (requestToEdit) {
        document.getElementById('empID').value = requestToEdit.empID;
        document.getElementById('empName').value = requestToEdit.empName;
        document.getElementById('project').value = requestToEdit.project;
        document.getElementById('cause').value = requestToEdit.cause;
        document.getElementById('source').value = requestToEdit.source;
        document.getElementById('destination').value = requestToEdit.destination;
        document.getElementById('fromdate').value = requestToEdit.fromdate;
        document.getElementById('noofdays').value = requestToEdit.noofdays;
        document.getElementById('modeoftravel').value = requestToEdit.modeoftravel;

        document.getElementById('empID').disabled = true;

        
        document.getElementById('form').style.display = 'block';
        document.getElementById('view').style.display = 'none';

      
        document.getElementById('requestForm').onsubmit = function (event) {
            event.preventDefault();

            
            requestToEdit.empName = document.getElementById('empName').value;
            requestToEdit.project = document.getElementById('project').value;
            requestToEdit.cause = document.getElementById('cause').value;
            requestToEdit.source = document.getElementById('source').value;
            requestToEdit.destination = document.getElementById('destination').value;
            requestToEdit.fromdate = document.getElementById('fromdate').value;
            requestToEdit.noofdays = parseInt(document.getElementById('noofdays').value, 10);
            requestToEdit.modeoftravel = document.getElementById('modeoftravel').value;

            localStorage.setItem('travelRequests', JSON.stringify(allRequests));

            document.getElementById('requestForm').onsubmit = travelRequest;

            document.getElementById('empID').disabled = false;
            document.getElementById('requestForm').reset();

            alert("Request updated successfully!");
            backToForm();
        };
    }
}
