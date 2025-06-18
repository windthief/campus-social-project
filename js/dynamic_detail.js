document.addEventListener('DOMContentLoaded', function () {
    // 评论功能
    const commentInput = document.querySelector('.comment-input');
    const commentBtn = document.querySelector('.comment-editor .btn');

    if (commentBtn) {
        commentBtn.addEventListener('click', function () {
            const commentText = commentInput.value.trim();
            if (!commentText) return;

            // 模拟添加评论
            const newComment = document.createElement('div');
            newComment.className = 'comment-item';
            newComment.innerHTML = `
                <div class="user-avatar">张</div>
                <div class="comment-content">
                    <div class="comment-header">
                        <div class="username">张同学</div>
                        <div class="timestamp">刚刚</div>
                    </div>
                    <div class="comment-text">${commentText}</div>
                    <div class="comment-actions">
                        <button class="btn-link">👍 0</button>
                        <button class="btn-link">回复</button>
                    </div>
                </div>
            `;

            // 添加到评论列表顶部
            document.querySelector('.comments-list').prepend(newComment);
            commentInput.value = '';

            // 更新评论数
            const commentTitle = document.querySelector('.section-title');
            const countMatch = commentTitle.textContent.match(/\d+/);
            if (countMatch) {
                const count = parseInt(countMatch[0]) + 1;
                commentTitle.textContent = commentTitle.textContent.replace(/\d+/, count);
            }
        });
    }

    // 评论输入框回车提交
    if (commentInput) {
        commentInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                commentBtn.click();
            }
        });
    }
});