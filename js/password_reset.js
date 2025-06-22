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
        // 密码强度检测
        const passwordInput = document.getElementById('reg-password');
        const strengthBar = document.querySelector('.strength-bar');
        const strengthText = document.querySelector('.strength-text');
        passwordInput.addEventListener('input', function () {
            const password = this.value;
            let strength = 0;
            let text = '';

            // 至少6位
            if (password.length < 6) {
                strength = 1;
                text = '弱';
            } else {
                // 包含数字、字母、特殊字符
                if (password.match(/[a-zA-Z]+/)) strength++;
                if (password.match(/[0-9]+/)) strength++;
                if (password.match(/[!@#$%^&*()_+\-=$$$${};':"\\|,.<>\/?]+/)) strength++;

                if (strength === 1) {
                    text = '弱';
                } else if (strength === 2) {
                    text = '中';
                } else if (strength >= 3) {
                    text = '强';
                }
            }

            // 更新UI
            strengthBar.style.width = (strength * 33) + '%';
            if (strength === 1) {
                strengthBar.style.backgroundColor = 'var(--danger-color)';
            } else if (strength === 2) {
                strengthBar.style.backgroundColor = 'var(--warning-color)';
            } else if (strength >= 3) {
                strengthBar.style.backgroundColor = 'var(--success-color)';
            }
            strengthText.textContent = '密码强度: ' + text;
        });

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
            
            // 将数据保存到 localStorage
            
            localStorage.setItem('password', password);
            localStorage.setItem('confirmPassword', confirmPassword);

            // 模拟注册成功
            alert('修改成功！将跳转到登陆页面');
            window.location.href = 'login.html';
        });
    }
});