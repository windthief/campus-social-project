document.addEventListener('DOMContentLoaded', function () {
    //判断是否登录
    if (localStorage.getItem('isLoggedIn') === 'true') {
        //初始化个人信息
        const name = localStorage.getItem('name');
        document.querySelector('.user-avatar').textContent = name.charAt(0);
        document.querySelector('.username').textContent = name;
        document.querySelector('.profile-name').textContent = name;
        document.querySelector('.profile-id').textContent = `学号: ${localStorage.getItem('studentId')}`;
        document.querySelector('.profile-bio').textContent = localStorage.getItem('bio');

        //初始化头像
        const avatarDiv = document.querySelector('.profile-avatar');
        const avatarBase64 = localStorage.getItem('avatar');

        // 判断头像是否为空
        if (avatarBase64 && avatarBase64.trim() !== '') {
            avatarDiv.textContent = '';
            const avatarImage = document.createElement('img');
            avatarImage.src = avatarBase64;
            avatarImage.alt = '头像';

            avatarImage.style.width = '100px';
            avatarImage.style.height = '100px';
            avatarImage.style.borderRadius = '50%'; // 圆形头像
            avatarImage.style.objectFit = "cover";
            avatarDiv.appendChild(avatarImage);
        }
        else {
            document.querySelector('.profile-avatar').textContent = name.charAt(0);
        }
    }
    else {
        const avatarDiv = document.querySelector('.profile-avatar');

        // 清除头像显示
        const avatarImage = avatarDiv.querySelector('img');
        if (avatarImage) {
            avatarImage.remove();
        }
    }

    // 如果没有登录，阻止跳转并显示提示
    const editButton = document.getElementById("editButton");
    // 给按钮添加点击事件
    editButton.addEventListener("click", function (event) {
        if (localStorage.getItem("isLoggedIn") === "false") {
            event.preventDefault();  // 阻止默认跳转行为
            alert("请先登录！");
        }
    });

    // 个人主页选项卡切换
    const profileTabs = document.querySelectorAll('.profile-tab');
    profileTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            profileTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // 这里应该切换内容区域的显示
            // 目前只是模拟效果
            console.log('切换到标签:', this.textContent);
        });
    });

    // 关注/取关功能
    const followBtn = document.getElementById('follow-btn');
    if (followBtn) {
        followBtn.addEventListener('click', function () {
            if (this.textContent === '已关注') {
                this.textContent = '关注';
                this.classList.remove('btn-primary');
                this.classList.add('btn-outline');
            } else {
                this.textContent = '已关注';
                this.classList.remove('btn-outline');
                this.classList.add('btn-primary');
                alert('已关注用户');
            }
        });
    }

    // 发消息功能
    const messageBtn = document.getElementById('message-btn');
    if (messageBtn) {
        messageBtn.addEventListener('click', function () {
            alert('私信功能正在开发中...');
        });
    }
});