// --- AUTHENTICATION LOGIC ---
const loginLink = document.getElementById('login-link');
const logoutLink = document.getElementById('logout-link');
const authLinksDiv = document.getElementById('auth-links'); // Still needed if you want to add user name later

/**
 * Checks local storage for user status and updates the navigation links.
 */
function updateAuthStatus() {
    // 1. Check if 'userStatus' is set to 'loggedIn'
    const isLoggedIn = localStorage.getItem('userStatus') === 'loggedIn';

    if (loginLink && logoutLink) {
        if (isLoggedIn) {
            // If Logged In: Show Log Out, Hide Log In
            loginLink.style.display = 'none';
            logoutLink.style.display = 'inline-block';
        } else {
            // If Logged Out: Show Log In, Hide Log Out
            loginLink.style.display = 'inline-block';
            logoutLink.style.display = 'none';
        }
    }
}

// 2. Handle Login Click
if (loginLink) {
    loginLink.addEventListener('click', function(event) {
        event.preventDefault();
        // Sets the status in Local Storage
        localStorage.setItem('userStatus', 'loggedIn');
        alert('Simulation: You have successfully logged in!');
        updateAuthStatus();
    });
}

// 3. Handle Logout Click (MODIFIED: Added Redirect)
if (logoutLink) {
    logoutLink.addEventListener('click', function(event) {
        event.preventDefault();
        // Removes the status from Local Storage
        localStorage.removeItem('userStatus');
        alert('You have successfully logged out.');

        // **NEW FEATURE:** Force redirect to the home page after logging out
        window.location.href = 'index.html';

        // updateAuthStatus() is technically redundant here because the page will reload, 
        // but keeping it here for immediate visual feedback before redirect.
        updateAuthStatus();
    });
}

// Run on page load to set the initial state
updateAuthStatus();


// --- REMAINDER OF SCRIPT.JS (Form Validation) ---
const form = document.getElementById('issueReportForm');

if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // 1. GATHER AND CLEAN DATA
        const issueType = form.issueType.value;
        const location = form.location.value.trim();
        const details = form.details.value.trim();
        const contact = form.contact.value.trim();
        const messageElement = document.getElementById('formMessage');

        messageElement.textContent = '';
        messageElement.style.color = '';

        let isValid = true;

        // 2. VALIDATION CHECKS
        if (issueType === "") {
            messageElement.textContent = 'Please select the type of environmental issue.';
            isValid = false;
        } else if (location.length < 5) {
            messageElement.textContent = 'Please provide a more specific location (at least 5 characters).';
            isValid = false;
        } else if (details.length < 10) {
            messageElement.textContent = 'Please provide more descriptive details (at least 10 characters).';
            isValid = false;
        }

        // 3. SUBMISSION LOGIC
        if (isValid) {
            console.log('--- Simulated Report Submission Success ---');

            // User Feedback (Green text)
            messageElement.textContent = '✅ Success! Your report has been submitted and is under review.';
            messageElement.style.color = 'var(--color-forest-green)';

            form.reset();
        } else {
            // FAILURE: Display validation message (Red text)
            messageElement.style.color = 'var(--color-alert-red)';
        }
        // --- AUTHENTICATION LOGIC ---
        const loginLink = document.getElementById('login-link');
        const logoutLink = document.getElementById('logout-link');

        /**
         * Checks local storage for user status and updates the navigation links.
         */
        function updateAuthStatus() {
            // 1. Check if 'userStatus' is set to 'loggedIn'
            const isLoggedIn = localStorage.getItem('userStatus') === 'loggedIn';

            if (loginLink && logoutLink) {
                if (isLoggedIn) {
                    // If Logged In: Show Log Out, Hide Log In
                    loginLink.style.display = 'none';
                    logoutLink.style.display = 'inline-block';
                } else {
                    // If Logged Out: Show Log In, Hide Log Out
                    loginLink.style.display = 'inline-block';
                    logoutLink.style.display = 'none';
                }
            }
        }

        // 2. Handle Login Click
        if (loginLink) {
            loginLink.addEventListener('click', function(event) {
                event.preventDefault();
                // Sets the status in Local Storage
                localStorage.setItem('userStatus', 'loggedIn');
                alert('Simulation: You have successfully logged in!');
                updateAuthStatus();
            });
        }

        // 3. Handle Logout Click (Includes redirect to index.html)
        if (logoutLink) {
            logoutLink.addEventListener('click', function(event) {
                event.preventDefault();
                // Removes the status from Local Storage
                localStorage.removeItem('userStatus');
                alert('You have successfully logged out.');

                // **FUNCTIONAL CHANGE:** Redirect to the home page (index.html)
                window.location.href = 'index.html';

                updateAuthStatus();
            });
        }

        // Run on page load to set the initial state
        updateAuthStatus();
    });
}