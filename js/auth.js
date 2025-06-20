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

        // 头像上传预览
        const chooseAvatarBtn = document.getElementById('choose-avatar');
        const avatarUpload = document.getElementById('avatar-upload');
        const avatarPreview = document.getElementById('avatar-preview');

        chooseAvatarBtn.addEventListener('click', function () {
            avatarUpload.click();
        });

        avatarUpload.addEventListener('change', function () {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    // 将预览区域设置为上传的图片
                    avatarPreview.style.backgroundImage = `url(${e.target.result})`;
                    avatarPreview.style.backgroundSize = 'cover';
                    avatarPreview.style.backgroundPosition = 'center';
                    avatarPreview.textContent = '';
                };
                reader.readAsDataURL(file);
            }
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
            // 模拟登录成功，写入localStorage
            const user = {
                id: '1',
                name: '张同学',
                avatar: '张',
                nickname: '',
                college: '计算机学院'
            };
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify(user));
            // 跳转
            alert('登录成功！将跳转到个人主页');
            window.location.href = 'personal.html';
        });
    }
});