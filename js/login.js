if (!localStorage.getItem('users')) {
    const users = [
        { username: 'admin', password: 'admin123', role: 'admin' },
        { username: 'virat', password: 'virat123', role: 'user' },
        { username: 'rohit', password: 'rohit123', role: 'user' },
        { username: 'dhoni', password: 'dhoni123', role: 'user' },
        { username: 'sachin', password: 'sachin123', role: 'user' }
    ];
    localStorage.setItem('users', JSON.stringify(users));
}

function validateLogin(event) {
    event.preventDefault();

    const user = document.getElementById("userName").value;
    const pass = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem('users'));

    const matchedUser = users.find(u => u.username === user && u.password === pass);

    if (matchedUser) {
        localStorage.setItem('isLoggedIn', 'true');
        if (matchedUser.role === 'admin') {
            window.location.href = "../html/adminview.html";
        } else {
            window.location.href = "../html/request.html";
        }
    } else {
        alert("Invalid Credentials!");
    }
}
