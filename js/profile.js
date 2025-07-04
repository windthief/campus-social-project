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
    const tabContents = [
        document.getElementById('tab-dynamic'),
        document.getElementById('tab-album'),
        document.getElementById('tab-fav'),
        document.getElementById('tab-following'),
        document.getElementById('tab-fans')
    ];
    profileTabs.forEach((tab, idx) => {
        tab.addEventListener('click', function () {
            profileTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            tabContents.forEach((c, i) => c.style.display = (i === idx ? 'block' : 'none'));
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

    // 编辑资料弹窗逻辑
    const editBtn = document.getElementById('edit-profile-btn');
    const editModal = document.getElementById('edit-profile-modal');
    const modalMask = document.getElementById('modal-mask');
    const closeEditModal = document.getElementById('close-edit-modal');
    const editForm = document.getElementById('edit-profile-form');
    if (editBtn && editModal && modalMask && closeEditModal && editForm) {
        // 打开弹窗并填充当前信息
        editBtn.addEventListener('click', function(e) {
            e.preventDefault();
            let user = JSON.parse(localStorage.getItem('currentUser'));
            // 头像预览
            const avatarPreview = document.getElementById('edit-avatar-preview');
            avatarPreview.removeAttribute('data-avatar');
            if (user.avatar && user.avatar.startsWith('data:image')) {
                avatarPreview.innerHTML = `<img src='${user.avatar}' alt='头像' style='width:100%;height:100%;object-fit:cover;'>`;
                avatarPreview.dataset.avatar = user.avatar;
            } else {
                avatarPreview.textContent = user.avatar || (user.nickname ? user.nickname.charAt(0) : (user.name ? user.name.charAt(0) : 'U'));
            }
            document.getElementById('edit-nickname').value = user.nickname || user.name || '';
            document.getElementById('edit-bio').value = user.bio || '';
            document.getElementById('edit-tags').value = (user.tags || []).join(',');
            document.getElementById('edit-college').value = user.college || '';
            document.getElementById('edit-gender').value = user.gender || '';
            editModal.style.display = 'block';
            modalMask.style.display = 'block';
        });
        // 头像上传逻辑
        const avatarUpload = document.getElementById('edit-avatar-upload');
        const avatarPreview = document.getElementById('edit-avatar-preview');
        function triggerAvatarUpload() { avatarUpload.click(); }
        document.getElementById('choose-avatar-btn').onclick = triggerAvatarUpload;
        avatarPreview.onclick = triggerAvatarUpload;
        avatarUpload.onchange = function() {
            const file = this.files[0];
            if (file) {
                if (file.size > 2 * 1024 * 1024) {
                    alert('图片大小不能超过2MB');
                    return;
                }
                const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
                if (!validTypes.includes(file.type)) {
                    alert('仅支持 JPG, PNG, GIF 或 WebP 格式的图片');
                    return;
                }
                const reader = new FileReader();
                reader.onload = function(e) {
                    avatarPreview.innerHTML = `<img src='${e.target.result}' alt='头像' style='width:100%;height:100%;object-fit:cover;'>`;
                    avatarPreview.dataset.avatar = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        };
        // 关闭弹窗时清除预览缓存
        function closeEditModalFn() {
            editModal.style.display = 'none';
            modalMask.style.display = 'none';
            avatarPreview.removeAttribute('data-avatar');
            avatarUpload.value = '';
        }
        closeEditModal.addEventListener('click', closeEditModalFn);
        modalMask.addEventListener('click', closeEditModalFn);
        // 表单提交保存
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // 头像
            const avatarPreview = document.getElementById('edit-avatar-preview');
            let avatarData = avatarPreview.dataset.avatar;
            const avatarEl = document.querySelector('.profile-avatar');
            if (avatarEl) {
                if (avatarData) {
                    avatarEl.innerHTML = `<img src='${avatarData}' alt='头像' style='width:100%;height:100%;object-fit:cover;border-radius:50%;'>`;
                } else {
                    avatarEl.textContent = document.getElementById('edit-nickname').value.trim().charAt(0) || 'U';
                }
            }
            // 昵称
            const nameEl = document.querySelector('.profile-name');
            if (nameEl) nameEl.textContent = document.getElementById('edit-nickname').value.trim();
            // 简介
            const bioEl = document.querySelector('.profile-bio');
            if (bioEl) bioEl.textContent = document.getElementById('edit-bio').value.trim();
            // 标签
            const tagsEl = document.querySelector('.profile-tags');
            if (tagsEl) {
                const tags = document.getElementById('edit-tags').value.split(',').map(t => t.trim()).filter(Boolean);
                tagsEl.innerHTML = tags.map(tag => `<span class="tag">#${tag}</span>`).join('');
            }
            // 学院
            const college = document.getElementById('edit-college').value.trim();
            const collegeEl = document.querySelector('.profile-college');
            if (collegeEl) collegeEl.textContent = '学院：' + (college || '未填写');
            // 性别
            const gender = document.getElementById('edit-gender').value;
            const genderEl = document.querySelector('.profile-gender');
            if (genderEl) genderEl.textContent = '性别：' + (gender || '保密');
            closeEditModalFn();
        });
    }

    // 渲染"我的动态"tab内容
    function renderMyDynamicTab() {
        const tabDynamic = document.getElementById('tab-dynamic');
        if (!tabDynamic) return;
        // 示例数据
        const myDynamics = [
            {
                user: { name: '张同学', avatar: '张', college: '计算机学院' },
                time: '2小时前',
                text: '终于完成了数据结构的课程设计！三个星期的努力没有白费。感谢一起熬夜奋斗的舍友们，我们一定会取得好成绩💪🏻',
                hashtag: '#学习日常 #课程设计',
                image: '../images/study.webp',
                like: 86,
                comment: 24
            },
            {
                user: { name: '张同学', avatar: '张', college: '计算机学院' },
                time: '昨天',
                text: '今天在图书馆遇到了老同学，聊了很多大学生活的趣事。',
                hashtag: '#校园生活',
                image: '../images/libarary.webp',
                like: 42,
                comment: 8
            }
        ];
        tabDynamic.innerHTML = myDynamics.map(item => `
            <div class="dynamic-card" style="margin-bottom:24px;">
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
                    <div class="action-btn like-btn">
                        <span class="like-icon">❤</span>
                        <span class="count">${item.like}</span>
                    </div>
                    <div class="action-btn">
                        <span>💬</span>
                        <span class="count">${item.comment}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
    // 页面加载时渲染
    renderMyDynamicTab();

    // 渲染相册tab
    function renderAlbumTab() {
        const tabAlbum = document.getElementById('tab-album');
        if (!tabAlbum) return;
        tabAlbum.innerHTML = `
            <div class="album-list">
                <img src="../images/libarary2.webp" alt="相册1" style="width:120px;height:80px;margin:8px;border-radius:8px;object-fit:cover;">
                <img src="../images/study.webp" alt="相册2" style="width:120px;height:80px;margin:8px;border-radius:8px;object-fit:cover;">
            </div>
        `;
    }
    // 渲染收藏tab
    function renderFavTab() {
        const tabFav = document.getElementById('tab-fav');
        if (!tabFav) return;
        // 示例收藏动态数据
        const favDynamics = [
            {
                user: { name: '李同学', avatar: '李', college: '外国语学院' },
                time: '8小时前',
                text: '发现了一个超美的自习地点！学校新建的图书馆顶楼，俯瞰整个校园，学习氛围也超好，推荐给大家！📚',
                hashtag: '#自习 #图书馆',
                image: '../images/libarary2.webp',
                like: 156,
                comment: 42
            },
            {
                user: { name: '王学长', avatar: '王', college: '经济管理学院' },
                time: '昨天',
                text: '📢【讲座预告】本周五晚7点，邀请到了腾讯资深产品经理@刘老师 来我校分享产品设计经验，地点：大礼堂A103。',
                hashtag: '#讲座 #产品设计',
                image: '',
                like: 98,
                comment: 35
            }
        ];
        tabFav.innerHTML = favDynamics.map(item => `
            <div class=\"dynamic-card\" style=\"margin-bottom:24px;\">\n                <div class=\"dynamic-header\">\n                    <div class=\"user-avatar\">${item.user.avatar}</div>\n                    <div class=\"user-info\">\n                        <div class=\"username\">${item.user.name}</div>\n                        <div class=\"timestamp\">${item.time} · ${item.user.college}</div>\n                    </div>\n                </div>\n                <div class=\"dynamic-content\">\n                    <div class=\"dynamic-text\">\n                        ${item.text}\n                        ${item.hashtag ? `<span class='hashtag'>${item.hashtag}</span>` : ''}\n                    </div>\n                    ${item.image ? `<div class='dynamic-image'><img src='${item.image}' alt='动态图片'></div>` : ''}\n                </div>\n                <div class=\"dynamic-actions\">\n                    <div class=\"action-btn like-btn\">\n                        <span class=\"like-icon\">❤</span>\n                        <span class=\"count\">${item.like}</span>\n                    </div>\n                    <div class=\"action-btn\">\n                        <span>💬</span>\n                        <span class=\"count\">${item.comment}</span>\n                    </div>\n                </div>\n            </div>
        `).join('');
    }
    // 渲染关注tab
    function renderFollowingTab() {
        const tabFollowing = document.getElementById('tab-following');
        if (!tabFollowing) return;
        const followingList = [
            { name: '李同学', avatar: '李', college: '外国语学院' },
            { name: '王学长', avatar: '王', college: '经济管理学院' }
        ];
        tabFollowing.innerHTML = `<div class='usercard-list'>` + followingList.map(user => `
            <div class='usercard'>
                <div class='usercard-avatar'>${user.avatar}</div>
                <div class='usercard-info'>
                    <div class='usercard-name'>${user.name}</div>
                    <div class='usercard-college'>${user.college}</div>
                </div>
                <button class='usercard-btn'>已关注</button>
                <button class='usercard-btn usercard-btn-outline'>私信</button>
            </div>
        `).join('') + `</div>`;
    }
    // 渲染粉丝tab
    function renderFansTab() {
        const tabFans = document.getElementById('tab-fans');
        if (!tabFans) return;
        const fansList = [
            { name: '赵同学', avatar: '赵', college: '艺术学院' },
            { name: '孙学姐', avatar: '孙', college: '管理学院' }
        ];
        tabFans.innerHTML = `<div class='usercard-list'>` + fansList.map(user => `
            <div class='usercard'>
                <div class='usercard-avatar'>${user.avatar}</div>
                <div class='usercard-info'>
                    <div class='usercard-name'>${user.name}</div>
                    <div class='usercard-college'>${user.college}</div>
                </div>
                <button class='usercard-btn usercard-btn-outline'>回关</button>
                <button class='usercard-btn usercard-btn-outline'>私信</button>
            </div>
        `).join('') + `</div>`;
    }
    // 页面加载时渲染
    renderAlbumTab();
    renderFavTab();
    renderFollowingTab();
    renderFansTab();
});