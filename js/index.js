document.addEventListener('DOMContentLoaded', function () {



    // 切换标签页
    const feedTabs = document.querySelectorAll('.feed-tab');
    let currentTab = 0; // 0:全部动态 1:热点推荐 2:好友动态 3:话题精选
    // 记录原始顺序
    const originalList = window.dynamicList ? window.dynamicList.slice() : [];
    function renderDynamicList(tabIdx = 0) {
        const feedLeft = document.getElementById('feed-left');
        if (!feedLeft || !window.dynamicList) return;
        let list = window.dynamicList.slice();
        if (tabIdx === 1) {
            // 热点推荐：按点赞数降序
            list.sort((a, b) => b.like - a.like);
        }
        feedLeft.innerHTML = list.map(item => `
            <div class="dynamic-card" data-id="${item.id}" style="cursor:pointer;">
                <div class="dynamic-header">
                    <div class="user-avatar">${item.user.avatar}</div>
                    <div class="user-info">
                        <div class="username">${item.user.name}</div>
                        <div class="timestamp">${item.time} · ${item.user.college}</div>
                    </div>
                </div>
                <div class="dynamic-content">
                    <div class="dynamic-text">
                        ${item.text}
                        ${item.hashtag ? `<span class='hashtag'>${item.hashtag}</span>` : ''}
                    </div>
                    ${item.image ? `<div class='dynamic-image'><img src='${item.image}' alt='动态图片'></div>` : ''}
                </div>
                <div class="dynamic-actions">
                    <div class="action-btn like-btn${item.liked ? ' liked' : ''}">
                        <span class="like-icon">${item.liked ? `<svg viewBox='0 0 24 24' width='20' height='20' fill='#e6004c' stroke='#e6004c' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 21C12 21 4 13.36 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.36 16 21 16 21H12Z'></path></svg>` : `<svg viewBox='0 0 24 24' width='20' height='20' fill='none' stroke='#e6004c' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 21C12 21 4 13.36 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.36 16 21 16 21H12Z'></path></svg>`}</span>
                        <span class="count">${item.like}</span>
                    </div>
                    <div class="action-btn">
                        <span>💬</span>
                        <span class="count">${item.comment}</span>
                    </div>
                    <div class="action-btn">
                        <span>↗️</span>
                    </div>
                </div>
            </div>
        `).join('');
        // 添加点击事件
        feedLeft.querySelectorAll('.dynamic-card').forEach((card, idx) => {
            card.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                window.location.href = `dynamic_detail.html?id=${id}`;
            });
            // 阻止action-btn点击冒泡
            card.querySelectorAll('.action-btn').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                });
            });
            // 点赞交互
            const likeBtn = card.querySelector('.like-btn');
            if (likeBtn) {
                likeBtn.addEventListener('click', function() {
                    const item = window.dynamicList[idx];
                    item.liked = !item.liked;
                    item.like += item.liked ? 1 : -1;
                    // 写入localStorage，保证详情页同步
                    const likeState = JSON.parse(localStorage.getItem('likeState') || '{}');
                    likeState[item.id] = { liked: item.liked, like: item.like };
                    localStorage.setItem('likeState', JSON.stringify(likeState));
                    renderDynamicList(currentTab);
                });
            }
        });
    }
    // feed-tab点击事件分开处理
    if (feedTabs[0]) {
        feedTabs[0].addEventListener('click', function () {
            feedTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            window.dynamicList = originalList.slice();
            currentTab = 0;
            renderDynamicList(currentTab);
        });
    }
    if (feedTabs[1]) {
        feedTabs[1].addEventListener('click', function () {
            feedTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            window.dynamicList = originalList.slice().sort((a, b) => b.like - a.like);
            currentTab = 1;
            renderDynamicList(currentTab);
        });
    }
    if (feedTabs[2]) {
        feedTabs[2].addEventListener('click', function () {
            feedTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            window.dynamicList = originalList.slice();
            currentTab = 2;
            renderDynamicList(currentTab);
        });
    }
    if (feedTabs[3]) {
        feedTabs[3].addEventListener('click', function () {
            feedTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            window.dynamicList = originalList.slice();
            currentTab = 3;
            renderDynamicList(currentTab);
        });
    }
    renderDynamicList(currentTab);

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

    // ================== 动态数据与渲染 ==================

    const dynamicList = [
        {
            user: { name: '张同学', avatar: '张', college: '计算机学院' },
            time: '2小时前',
            text: '终于完成了数据结构的课程设计！三个星期的努力没有白费。感谢一起熬夜奋斗的舍友们，我们一定会取得好成绩💪🏻',
            hashtag: '#学习日常 #课程设计',
            image: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='480' viewBox='0 0 640 480'%3E%3Crect fill='%23FFCCD5' width='640' height='480'/%3E%3Ctext fill='%23E6004C' font-family='Arial' font-size='30' x='280' y='240'%3E课程设计展示%3C/text%3E%3C/svg%3E",
            like: 86,
            comment: 24,
            extra: '↗️'
        },
        {
            user: { name: '李同学', avatar: '李', college: '外国语学院' },
            time: '8小时前',
            text: '发现了一个超美的自习地点！学校新建的图书馆顶楼，俯瞰整个校园，学习氛围也超好，推荐给大家！📚',
            hashtag: '',
            image: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='480' viewBox='0 0 640 480'%3E%3Crect fill='%23B5EAD7' width='640' height='480'/%3E%3Ctext fill='%2300713E' font-family='Arial' font-size='30' x='280' y='240'%3E图书馆风景%3C/text%3E%3C/svg%3E",
            like: 156,
            comment: 42,
            extra: '↗️'
        },
        {
            user: { name: '王学长', avatar: '王', college: '经济管理学院' },
            time: '昨天',
            text: '📢【讲座预告】本周五晚7点，邀请到了腾讯资深产品经理@刘老师 来我校分享产品设计经验，地点：大礼堂A103。本次讲座计入综合素质学分，欢迎感兴趣的学弟学妹来参加！',
            hashtag: '#讲座 #产品设计',
            image: '',
            like: 98,
            comment: 35,
            extra: '⭐️'
        }
    ];

    function renderDynamicList() {
        const feedLeft = document.getElementById('feed-left');
        if (!feedLeft || !window.dynamicList) return;
        feedLeft.innerHTML = window.dynamicList.map(item => `
            <div class="dynamic-card" data-id="${item.id}" style="cursor:pointer;">
                <div class="dynamic-header">
                    <div class="user-avatar">${item.user.avatar}</div>
                    <div class="user-info">
                        <div class="username">${item.user.name}</div>
                        <div class="timestamp">${item.time} · ${item.user.college}</div>
                    </div>
                </div>
                <div class="dynamic-content">
                    <div class="dynamic-text">
                        ${item.text}
                        ${item.hashtag ? `<span class='hashtag'>${item.hashtag}</span>` : ''}
                    </div>
                    ${item.image ? `<div class='dynamic-image'><img src='${item.image}' alt='动态图片'></div>` : ''}
                </div>
                <div class="dynamic-actions">
                    <div class="action-btn like-btn${item.liked ? ' liked' : ''}">
                        <span class="like-icon">${item.liked ? `<svg viewBox='0 0 24 24' width='20' height='20' fill='#e6004c' stroke='#e6004c' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 21C12 21 4 13.36 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.36 16 21 16 21H12Z'></path></svg>` : `<svg viewBox='0 0 24 24' width='20' height='20' fill='none' stroke='#e6004c' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 21C12 21 4 13.36 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.36 16 21 16 21H12Z'></path></svg>`}</span>
                        <span class="count">${item.like}</span>
                    </div>
                    <div class="action-btn">
                        <span>💬</span>
                        <span class="count">${item.comment}</span>
                    </div>
                    <div class="action-btn">
                        <span>↗️</span>
                    </div>
                </div>
            </div>
        `).join('');
        // 添加点击事件
        feedLeft.querySelectorAll('.dynamic-card').forEach((card, idx) => {
            card.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                window.location.href = `dynamic_detail.html?id=${id}`;
            });
            // 阻止action-btn点击冒泡
            card.querySelectorAll('.action-btn').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                });
            });
            // 点赞交互
            const likeBtn = card.querySelector('.like-btn');
            if (likeBtn) {
                likeBtn.addEventListener('click', function() {
                    const item = window.dynamicList[idx];
                    item.liked = !item.liked;
                    item.like += item.liked ? 1 : -1;
                    // 写入localStorage，保证详情页同步
                    const likeState = JSON.parse(localStorage.getItem('likeState') || '{}');
                    likeState[item.id] = { liked: item.liked, like: item.like };
                    localStorage.setItem('likeState', JSON.stringify(likeState));
                    renderDynamicList();
                });
            }
        });
    }
    renderDynamicList();
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



