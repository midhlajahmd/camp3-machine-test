function logout() {
    window.location.href = "../html/login.html"; 
}


function populateRequestsTable(priorityFilter = "All") {
    const allRequests = JSON.parse(localStorage.getItem('travelRequests')) || [];
    const tableBody = document.getElementById('viewTable');
    tableBody.innerHTML = ''; 

    allRequests.forEach((request) => {
        // Filter by priority only
        if (priorityFilter === "All" || request.priority === priorityFilter) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${request.empName}</td>
                <td>${request.destination}</td>
                <td>${request.priority}</td>
                <td><button onclick="viewDetails(${request.id})">View Details</button></td>
                <td><span class="status-label ${getStatusClass(request.status)}">${request.status}</span></td>
                <td>
                    <select onchange="updateStatus(${request.id}, this.value)">
                        <option value="Pending" ${request.status === "Pending" ? "selected" : ""}>Pending</option>
                        <option value="Approved" ${request.status === "Approved" ? "selected" : ""}>Approved</option>
                        <option value="Rejected" ${request.status === "Rejected" ? "selected" : ""}>Rejected</option>
                        <option value="On Hold" ${request.status === "On Hold" ? "selected" : ""}>On Hold</option>
                    </select>
                </td>
            `;
            tableBody.appendChild(row);
        }
    });
}

function getStatusClass(status) {
    return status.toLowerCase().replace(" ", "-");
}

// The function for handling priority button clicks
document.getElementById('allbtn').addEventListener('click', () => {
    populateRequestsTable("All");
});

document.getElementById('normalBtn').addEventListener('click', () => {
    populateRequestsTable("Normal");
});

document.getElementById('criticalBtn').addEventListener('click', () => {
    populateRequestsTable("Critical");
});


function updateStatus(requestId, newStatus) {
    const allRequests = JSON.parse(localStorage.getItem('travelRequests')) || [];
    const requestToUpdate = allRequests.find(request => request.id === requestId);

    if (requestToUpdate) {
        requestToUpdate.status = newStatus; 
        localStorage.setItem('travelRequests', JSON.stringify(allRequests)); 
        populateRequestsTable(); 
    }
}

function viewDetails(requestId) {
    const allRequests = JSON.parse(localStorage.getItem('travelRequests')) || [];
    const request = allRequests.find(req => req.id === requestId);

    if (request) {
        const detailsMessage = `
            Employee Name: ${request.empName}\n
            Employee ID: ${request.empID}\n
            Project: ${request.project}\n
            Cause for Travel: ${request.cause}\n
            Source: ${request.source}\n
            Destination: ${request.destination}\n
            From Date: ${request.fromdate}\n
            Number of Days: ${request.noofdays}\n
            Mode of Travel: ${request.modeoftravel}\n
            Status: ${request.status}\n
            Priority: ${request.priority}
        `;

        // Show the request details in an alert
        alert(detailsMessage);
    }
}


populateRequestsTable();
