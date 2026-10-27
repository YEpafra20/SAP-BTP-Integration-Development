(() => {
  const form = document.getElementById('sign-in-form');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const showPassword = document.getElementById('show-signin-password');
  const validationError = document.getElementById('signin-validation-error');

  if (!form || !email || !password || !showPassword || !validationError) return;

  function showValidationError(message) {
    validationError.textContent = message;
    validationError.hidden = false;
  }

  function clearValidationError() {
    validationError.textContent = '';
    validationError.hidden = true;
  }

  showPassword.addEventListener('change', () => {
    password.type = showPassword.checked ? 'text' : 'password';
  });

  form.addEventListener('invalid', (event) => {
    const field = event.target;
    if (field === email) {
      showValidationError(email.validity.valueMissing
        ? 'Enter your email address.'
        : 'Enter a valid email address.');
    } else if (field === password) {
      showValidationError('Enter your password.');
    }
  }, true);

  form.addEventListener('input', clearValidationError);
})();
