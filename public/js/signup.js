const signupFormHandler = async (event) => {
    event.preventDefault();

    const user_name = document.querySelector('#userName').value.trim();
    const user_email = document.querySelector('#email').value.trim();
    const user_password = document.querySelector('#password').value.trim();

    if (user_name && user_email && user_password) {

        const response = await fetch('/api/users/', {
            method: 'POST',
            body: JSON.stringify({ user_name, user_email, user_password }),
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
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
