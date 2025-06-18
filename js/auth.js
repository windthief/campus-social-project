document.addEventListener('DOMContentLoaded', function () {
    // 密码可见性切换
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function () {
            const passwordInput = this.previousElementSibling;
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.textContent = '👁️';
            } else {
                passwordInput.type = 'password';
                this.textContent = '👁️';
            }
        });
    });

    // 注册表单验证
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const password = document.getElementById('reg-password').value;
            const confirmPassword = document.getElementById('reg-confirm-password').value;

            if (password !== confirmPassword) {
                alert('两次输入的密码不一致！');
                return;
            }

            if (password.length < 6) {
                alert('密码长度至少需要6位！');
                return;
            }

            // 模拟注册成功
            alert('注册成功！将跳转到登录页面');
            window.location.href = 'login.html';
        });
    }

    // 登录表单提交
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // 模拟登录成功
            alert('登录成功！将跳转到个人主页');
            window.location.href = 'personal.html';
        });
    }
});