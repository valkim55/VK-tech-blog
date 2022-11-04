//create a function and add event listener for login/signup forms submissions

async function signupFormHandler(event) {
    event.preventDefault();

    const first_name = document.querySelector('#firstname-signup').value.trim();
    const last_name = document.querySelector('#lastname-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if(first_name && last_name && username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({ first_name, last_name, username, email, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        if(response.ok) {
            console.log('success');
        } else {
            alert(response.statusText);
        }
    }
};


async function loginFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if(username && email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({username, email, password}),
            headers: { 'Content-Type': 'application/json' }
        });
        if(response.ok) {
            //once the user is successfully logged in they're redirected to the homepage
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}


document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
document.querySelector('.login-form').addEventListener('submit', loginFormHandler)