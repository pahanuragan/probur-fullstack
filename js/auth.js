const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim().toLowerCase();
    const phone = document.getElementById("registerPhone").value.trim();
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("registerConfirmPassword").value;

    if (password !== confirmPassword) {
      showRegisterMessage("Пароли не совпадают", false);
      return;
    }

    const users = JSON.parse(localStorage.getItem("probur-users")) || [];

    const alreadyExists = users.some(user => user.email === email);

    if (alreadyExists) {
      showRegisterMessage("Пользователь с таким email уже существует", false);
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      phone,
      password
    };

    users.push(newUser);
    localStorage.setItem("probur-users", JSON.stringify(users));
    localStorage.setItem("probur-current-user", JSON.stringify(newUser));

    showRegisterMessage("Регистрация успешна. Переходим в личный кабинет...", true);

    setTimeout(() => {
      window.location.href = "account.html";
    }, 1200);
  });
}

function showRegisterMessage(text, success) {
  registerMessage.textContent = text;
  registerMessage.classList.remove("hidden", "error", "success");
  registerMessage.classList.add(success ? "success" : "error");
}