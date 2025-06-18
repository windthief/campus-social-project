// 管理员用户管理脚本
document.addEventListener('DOMContentLoaded', function () {
    // 检查是否为管理员
    const currentUser = getCurrentUser();
    if (!currentUser || !currentUser.isAdmin) {
        showNotification('无权访问管理界面', 'error');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
        return;
    }

    // 加载用户数据
    loadUserData();

    // 刷新按钮
    document.getElementById('refresh-users').addEventListener('click', loadUserData);
});

function loadUserData() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const tableBody = document.getElementById('user-table-body');

    // 清空表格
    tableBody.innerHTML = '<tr><td colspan="8">加载中...</td></tr>';

    // 模拟延迟
    setTimeout(() => {
        let tableHTML = '';

        users.forEach(user => {
            tableHTML += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.studentId}</td>
                    <td>${user.name}</td>
                    <td>${user.nickname || '-'}</td>
                    <td>${user.college}</td>
                    <td>${formatDate(user.createdAt)}</td>
                    <td>
                        <span class="status-badge ${user.isBanned ? 'banned' : 'active'}">
                            ${user.isBanned ? '已封禁' : '正常'}
                        </span>
                    </td>
                    <td>
                        <button class="btn btn-small btn-secondary" data-action="reset" data-id="${user.id}">重置密码</button>
                        <button class="btn btn-small ${user.isBanned ? 'btn-success' : 'btn-danger'}" data-action="ban" data-id="${user.id}">
                            ${user.isBanned ? '解封' : '封禁'}
                        </button>
                    </td>
                </tr>
            `;
        });

        tableBody.innerHTML = tableHTML || '<tr><td colspan="8">暂无用户数据</td></tr>';

        // 添加操作按钮事件
        document.querySelectorAll('[data-action="reset"]').forEach(btn => {
            btn.addEventListener('click', function () {
                resetUserPassword(this.dataset.id);
            });
        });

        document.querySelectorAll('[data-action="ban"]').forEach(btn => {
            btn.addEventListener('click', function () {
                toggleUserBanStatus(this.dataset.id);
            });
        });
    }, 500);
}

// 重置用户密码
function resetUserPassword(userId) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) return;

    users[userIndex].password = '123456'; // 默认重置密码
    localStorage.setItem('users', JSON.stringify(users));
    showNotification(`已将用户 ${users[userIndex].name} 的密码重置为默认`);
}

// 封禁/解封用户
function toggleUserBanStatus(userId) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) return;

    users[userIndex].isBanned = !users[userIndex].isBanned;
    localStorage.setItem('users', JSON.stringify(users));
    showNotification(`已${users[userIndex].isBanned ? '封禁' : '解封'}用户 ${users[userIndex].name}`);
    loadUserData();
}