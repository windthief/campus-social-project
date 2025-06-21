document.addEventListener('DOMContentLoaded', function () {
    //初始化信息
    document.getElementById('reg-name').value = localStorage.getItem('name');
    document.getElementById('bio').value = localStorage.getItem('bio');
    document.getElementById('nickname').value = localStorage.getItem('nickname');
    document.getElementById('college').value = localStorage.getItem('college');

    //初始化头像
    const avatarDiv = document.querySelector('.user-avatar-large');
    const avatarBase64 = localStorage.getItem('avatar');

    if(avatarDiv == null){
        console.log("null");
    }
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
        document.querySelector('.profile-avatar').textContent = localStorage.getItem('name').charAt(0);
    }


    // 头像上传功能实现
    const avatarUpload = document.getElementById('avatar-upload');
    const avatarPreview = document.getElementById('avatar-preview');
    const chooseAvatarBtn = document.getElementById('choose-avatar');

    if (chooseAvatarBtn) {
        chooseAvatarBtn.addEventListener('click', function () {
            avatarUpload.click();
        });
    }

    if (avatarUpload) {
        avatarUpload.addEventListener('change', function () {
            const file = this.files[0];
            if (file) {
                if (file.size > 2 * 1024 * 1024) {
                    showError('avatar-preview', '图片大小不能超过2MB');
                    return;
                }

                const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
                if (!validTypes.includes(file.type)) {
                    showError('avatar-preview', '仅支持 JPG, PNG, GIF 或 WebP 格式的图片');
                    return;
                }

                //清除现有头像
                const avatarImage = avatarDiv.querySelector('img');
                if (avatarImage) {
                    avatarImage.remove();
                }

                const reader = new FileReader();
                reader.onload = function (e) {
                    // 清除文本内容，显示图片
                    avatarPreview.innerHTML = '';
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.alt = "用户头像";
                    img.style.width = "100%";
                    img.style.height = "100%";
                    img.style.objectFit = "cover";
                    avatarPreview.appendChild(img);

                    const avatarBase64 = e.target.result;
                    localStorage.setItem('avatar', avatarBase64);
                }
                reader.readAsDataURL(file);
            }
        });
    }

    //修改提交
    const loginForm = document.getElementById('register-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('reg-name').value;
            const bio = document.getElementById('bio').value;
            const nickname = document.getElementById('nickname').value;
            const college = document.getElementById('college').value;

            // 个人简介验证
            if (bio.length > 200) {
                showError('bio', '个人简介不能超过200字');
                isValid = false;
            }

            // 将数据保存到 localStorage
            localStorage.setItem('name', name);
            localStorage.setItem('bio', bio);
            localStorage.setItem('nickname', nickname);
            localStorage.setItem('college', college);

            // 跳转
            alert('修改成功！将跳转到个人主页');
            window.location.href = 'personal.html';
        });
    }

});