const loginFormHandler = async (event) => {
    event.preventDefault();

    const user_email = document.querySelector('#email-login').value.trim();
    const user_password = document.querySelector('#password-login').value.trim();

    if (user_email && user_password) {

        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ user_email, user_password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            location.replace('/');
        } else {
            console.log(response);
            alert('Failed to log in');
        }
    }
};

document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
