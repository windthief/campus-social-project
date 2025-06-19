document.addEventListener('DOMContentLoaded', function () {
    // 获取动态id
    function getQueryId() {
        const params = new URLSearchParams(window.location.search);
        return parseInt(params.get('id'));
    }
    const dynamicId = getQueryId();
    const dynamic = window.dynamicList ? window.dynamicList.find(d => d.id === dynamicId) : null;
    if (!dynamic) return;

    // 渲染动态详情
    const detailCard = document.querySelector('.dynamic-detail-card');
    if (detailCard) {
        detailCard.innerHTML = `
            <div class="dynamic-header">
                <div class="user-avatar">${dynamic.user.avatar}</div>
                <div class="user-info">
                    <div class="username">${dynamic.user.name}</div>
                    <div class="timestamp">${dynamic.user.college} • ${dynamic.time}</div>
                </div>
                <button class="btn btn-outline btn-small">关注</button>
            </div>
            <div class="dynamic-content">
                <div class="dynamic-text">
                    ${dynamic.text}
                    <div class="hashtag">${dynamic.hashtag}</div>
                </div>
                <div class="dynamic-image">
                    ${dynamic.image ? `<img src='${dynamic.image}' alt='动态图片'>` : ''}
                </div>
                <div class="dynamic-stats">
                    <div class="stat-item"><span>🔥</span> ${dynamic.views}次浏览</div>
                    <div class="stat-item"><span>📍</span> ${dynamic.location || ''}</div>
                </div>
                <div class="dynamic-actions">
                    <button class="action-btn like-btn"><span>👍</span><span class="count">${dynamic.like}</span></button>
                    <button class="action-btn"><span>↗️</span> 转发</button>
                    <button class="action-btn"><span>⭐</span> 收藏</button>
                </div>
            </div>
        `;
    }
    // 渲染评论
    function renderComments(comments, container) {
        if (!comments || !container) return;
        container.innerHTML = comments.map(comment => `
            <div class="comment-item">
                <div class="user-avatar">${comment.user.avatar}</div>
                <div class="comment-content">
                    <div class="comment-header">
                        <div class="username">${comment.user.name}</div>
                        <div class="timestamp">${comment.time}</div>
                    </div>
                    <div class="comment-text">${comment.text}</div>
                    <div class="comment-actions">
                        <button class="btn-link">👍 ${comment.like || 0}</button>
                        <button class="btn-link">回复</button>
                    </div>
                    ${comment.replies && comment.replies.length > 0 ? `<div class='comment-reply'>${renderCommentsHtml(comment.replies)}</div>` : ''}
                </div>
            </div>
        `).join('');
    }
    function renderCommentsHtml(comments) {
        return comments.map(comment => `
            <div class=\"comment-item\">\n                <div class=\"user-avatar\">${comment.user.avatar}</div>\n                <div class=\"comment-content\">\n                    <div class=\"comment-header\">\n                        <div class=\"username\">${comment.user.name}</div>\n                        <div class=\"timestamp\">${comment.time}</div>\n                    </div>\n                    <div class=\"comment-text\">${comment.text}</div>\n                    <div class=\"comment-actions\">\n                        <button class=\"btn-link\">👍 ${comment.like || 0}</button>\n                        <button class=\"btn-link\">回复</button>\n                    </div>\n                </div>\n            </div>\n        `).join('');
    }
    const commentsList = document.querySelector('.comments-list');
    renderComments(dynamic.comments, commentsList);
    // 更新评论数
    const commentTitle = document.querySelector('.section-title');
    if (commentTitle) {
        commentTitle.textContent = `评论 (${dynamic.comment})`;
    }

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