document.addEventListener('DOMContentLoaded', function () {



    // 切换标签页
    const feedTabs = document.querySelectorAll('.feed-tab');
    feedTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            feedTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // 这里应该切换内容区域的显示
            // 目前只是模拟效果
            console.log('切换到标签:', this.textContent);
        });
    });

    // 动态图片懒加载
    const lazyImages = document.querySelectorAll('.dynamic-image img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (!img.src) {
                    img.src = img.dataset.src;
                }
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        if (!img.src) {
            img.dataset.src = img.getAttribute('src') || '';
            img.removeAttribute('src');
            imageObserver.observe(img);
        }
    });


    // 检查登录状态
    function checkLogin() {
        return localStorage.getItem('isLoggedIn') === 'true';
    }
    // 获取当前用户信息
    function getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }
    // 设置登录状态
    function setLoginStatus(loggedIn, userData) {
        localStorage.setItem('isLoggedIn', loggedIn ? 'true' : 'false');
        if (userData) {
            localStorage.setItem('currentUser', JSON.stringify(userData));
        }
    }
    // 主题切换功能
    const themeToggle = document.getElementById('theme-toggle');
    function updateThemeIcon() {
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.textContent = '☀️';
        } else {
            themeToggle.textContent = '🌙';
        }
    }
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
            updateThemeIcon();
        });

        // 初始化主题
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
        updateThemeIcon();
    }

    // 注册表单校验
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // 表单数据
            const formData = {
                studentId: document.getElementById('reg-student-id').value,
                name: document.getElementById('reg-name').value,
                password: document.getElementById('reg-password').value,
                confirmPassword: document.getElementById('reg-confirm-password').value,
                nickname: document.getElementById('nickname').value || '',
                college: document.getElementById('college').value,
                tags: Array.from(document.querySelectorAll('.selected-tag')).map(tag => tag.textContent),
                avatar: localStorage.getItem('tempAvatar') || ''
            };

            // 校验逻辑
            if (formData.password !== formData.confirmPassword) {
                showNotification('两次输入的密码不一致', 'error');
                return;
            }

            if (formData.password.length < 6) {
                showNotification('密码长度至少需要6位', 'error');
                return;
            }
            // 保存用户数据
            let users = JSON.parse(localStorage.getItem('users')) || [];

            // 检查学号是否已注册
            if (users.some(user => user.studentId === formData.studentId)) {
                showNotification('该学号已注册', 'error');
                return;
            }
            // 添加新用户
            users.push({
                id: Date.now().toString(),
                ...formData,
                createdAt: new Date().toISOString(),
                posts: [],
                followers: [],
                following: [],
                isAdmin: false
            });
            localStorage.setItem('users', JSON.stringify(users));

            // 设置登录状态
            setLoginStatus(true, users.find(u => u.studentId === formData.studentId));

            showNotification('注册成功！欢迎加入荔枝校园');
            setTimeout(() => {
                window.location.href = 'personal.html';
            }, 1500);
        });
    }
    // 登录表单处理
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const studentId = document.getElementById('student-id').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('remember').checked;

            // 获取用户数据
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.studentId === studentId && u.password === password);

            if (!user) {
                showNotification('学号或密码错误', 'error');
                return;
            }

            // 设置登录状态
            setLoginStatus(true, user);

            if (rememberMe) {
                localStorage.setItem('rememberedUser', studentId);
            }

            showNotification(`欢迎回来，${user.nickname || user.name}`);
            setTimeout(() => {
                window.location.href = 'personal.html';
            }, 1500);
        });
    }
});


// 管理员功能
if (getCurrentUser() && getCurrentUser().isAdmin) {
    const adminPanel = document.createElement('div');
    adminPanel.className = 'admin-panel';
    adminPanel.innerHTML = '管理员面板';
    document.body.appendChild(adminPanel);
}

// 更新用户菜单
updateUserMenu();


// 更新用户菜单
function updateUserMenu() {
    const userArea = document.querySelector('.user-area');
    if (!userArea) return;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = users.find(u => u.id === getCurrentUser()?.id);

    if (currentUser) {
        // 已登录状态
        userArea.innerHTML = `
            <div class="user-trigger">
                <div class="user-avatar" style="background-color: ${getAvatarColor(currentUser.id)}">
                    ${currentUser.nickname ? currentUser.nickname.charAt(0) : currentUser.name.charAt(0)}
                </div>
                <span class="user-text">${currentUser.nickname || currentUser.name}</span>
            </div>
            <div class="user-menu">
                <a href="personal.html">个人主页</a>
                <a href="post.html">发布动态</a>
                <a href="settings.html">账号设置</a>
                <a href="#" id="logout">退出登录</a>
            </div>
        `;

        document.getElementById('logout')?.addEventListener('click', function (e) {
            e.preventDefault();
            setLoginStatus(false);
            showNotification('已退出登录');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        });
    } else {
        // 未登录状态
        userArea.innerHTML = `
            <div class="user-trigger">
                <div class="user-icon">👤</div>
                <span class="user-text">个人中心</span>
            </div>
            <div class="login-prompt">
                <div class="prompt-header">
                    <div class="prompt-icon">🔒</div>
                    <div class="prompt-text">登录后即可访问个人中心<br>查看动态、消息和收藏</div>
                </div>
                <a href="login.html" class="btn-login">立即登录</a>
            </div>
        `;
    }
}



