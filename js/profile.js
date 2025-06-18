document.addEventListener('DOMContentLoaded', function () {
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