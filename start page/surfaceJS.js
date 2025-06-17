// 模拟动态数据
const mockPosts = [
    {
        id: 1,
        author: 'Sun_foto',
        avatar: 'imgs/Sun_foto.jpg',
        title: '深大 | 像是通往另一个世界的入口',
        content: '深圳大学的洞洞楼（正式名称为"深圳大学综合楼"），不规则的开放式窗洞，从远处看确实像是两扇大门，中间的开放空间仿佛是通向未来的入口。 拍摄位置📍 P 1-6:深圳大学沧海校区致艺楼 P 7:沧海校区宿舍楼 P 9-10:深大地铁站 #深圳周末做什么 #深圳拍照 #深圳大学 #摄影 #建筑摄影 #看不一样的风景 #不同视角不一样的美景 #站在高处看景',
        images: ['imgs/深大像是通往另一个世界的入口.jpg'],
        timestamp: '10分钟前',
        likes: 1000,
        reposts: 5,
        commentCount: 3,
        comments: [
            {
                user: '用户1',
                content: '拍得真好看！',
                timestamp: '5分钟前'
            },
            {
                user: '用户2',
                content: '这是哪个校区啊？',
                timestamp: '3分钟前'
            },
            {
                user: '用户3',
                content: '好想去看看！',
                timestamp: '1分钟前'
            }
        ]
    },
    {
        id: 2,
        author: '怡宝呀',
        avatar: 'imgs/怡宝呀.jpg',
        title: '深大你活动是真的多',
        content: '',
        images: ['imgs/深大你活动是真的多.jpg'],
        timestamp: '30分钟前',
        likes: 500,
        reposts: 12,
        commentCount: 8,
        comments: [
            {
                user: '用户1',
                content: '确实很多活动！',
                timestamp: '25分钟前'
            },
            {
                user: '用户2',
                content: '有什么推荐的活动吗？',
                timestamp: '20分钟前'
            }
        ]
    },
    {
        id: 3,
        author: '什么板栗',
        avatar: 'imgs/什么板栗.jpg',
        title: '深大赢麻了',
        content: '#校园生活 #春天 #美景 #樱花季',
        images: ['imgs/深大赢麻了.jpg'],
        timestamp: '1小时前',
        likes: 450,
        reposts: 18,
        commentCount: 15,
        comments: [
            {
                user: '用户1',
                content: '樱花真美！',
                timestamp: '55分钟前'
            },
            {
                user: '用户2',
                content: '这是哪个校区？',
                timestamp: '50分钟前'
            }
        ]
    },
    {
        id: 4,
        author: '阿佩怡',
        avatar: 'imgs/阿佩怡.jpg',
        title: '祝毕业快乐，前程似锦！🎓',
        content: '',
        images: ['imgs/祝毕业快乐，前程似锦.jpg'],
        timestamp: '2小时前',
        likes: 300,
        reposts: 45,
        commentCount: 32,
        comments: [
            {
                user: '用户1',
                content: '毕业快乐！',
                timestamp: '1小时55分钟前'
            },
            {
                user: '用户2',
                content: '前程似锦！',
                timestamp: '1小时50分钟前'
            }
        ]
    },
    {
        id: 5,
        author: '深大校园菌',
        avatar: 'imgs/深大校园菌.jpg',
        title: '深大校园菌',
        content: '深大校园菌',
        images: ['imgs/深大校园菌.jpg'],
        timestamp: '3小时前',
        likes: 200,
        reposts: 30,
        commentCount: 25,
        comments: []
    },
    {
        id: 6,
        author: '深大校园菌',
        avatar: 'imgs/深大校园菌.jpg',
        title: '深大校园菌',
        content: '深大校园菌',
        images: ['imgs/深大校园菌.jpg'],
        timestamp: '4小时前',
        likes: 150,
        reposts: 20,
        commentCount: 18,
        comments: []
    },
    {
        id: 7,
        author: '深大校园菌',
        avatar: 'imgs/深大校园菌.jpg',
        title: '深大校园菌',
        content: '深大校园菌',
        images: ['imgs/深大校园菌.jpg'],
        timestamp: '5小时前',
        likes: 100,
        reposts: 15,
        commentCount: 12,
        comments: []
    },
    {
        id: 8,
        author: '深大校园菌',
        avatar: 'imgs/深大校园菌.jpg',
        title: '深大校园菌',
        content: '深大校园菌',
        images: ['imgs/深大校园菌.jpg'],
        timestamp: '6小时前',
        likes: 80,
        reposts: 10,
        commentCount: 8,
        comments: []
    },
    {
        id: 9,
        author: '深大校园菌',
        avatar: 'imgs/深大校园菌.jpg',
        title: '深大校园菌',
        content: '深大校园菌',
        images: ['imgs/深大校园菌.jpg'],
        timestamp: '7小时前',
        likes: 60,
        reposts: 8,
        commentCount: 6,
        comments: []
    },
    {
        id: 10,
        author: '深大校园菌',
        avatar: 'imgs/深大校园菌.jpg',
        title: '深大校园菌',
        content: '深大校园菌',
        images: ['imgs/深大校园菌.jpg'],
        timestamp: '8小时前',
        likes: 40,
        reposts: 5,
        commentCount: 4,
        comments: []
    }
];

// 模拟社区数据
const mockCommunityPosts = [
    {
        id: 1,
        author: '不爱吃芋头',
        avatar: 'imgs/不爱吃芋头.jpg',
        title: '崩溃了，丽湖宵夜街来碗馄饨',
        content: '当着我们的面，把掉在石板的馄饨都放回去煮！！！！！！\n' +
                 '掉在地上的有些扔垃圾桶，有些收起来了！！！\n' +
                 '每天晚上都要吃的小女孩心碎！！！前两天下大雨打风\n' +
                 '我都去！\n' +
                 '粉转黑了！',
        images: [],
        timestamp: '2小时前',
        likes: 45,
        reposts: 12,
        commentCount: 23,
        comments: []
    },
    {
        id: 2,
        author: '还行',
        avatar: 'imgs/5.png',
        title: '深大的成绩单可以只打印没有挂科的吗',
        content: '',
        images: [],
        timestamp: '3小时前',
        likes: 36,
        reposts: 9,
        commentCount: 18,
        comments: []
    },
    {
        id: 3,
        author: '一根小海草',
        avatar: 'imgs/7.png',
        title: '完蛋了，积极心理学没期末线上考试',
        content: '有没有同学记得期末成绩各项占比',
        images: [],
        timestamp: '4小时前',
        likes: 28,
        reposts: 7,
        commentCount: 15,
        comments: []
    }
];

// 处理话题标签
function processHashtags(content) {
    // 直接返回内容，不处理标签
    return content;
}

// 初始化本地存储数据
function initializeLocalStorage() {
    if (!localStorage.getItem('postInteractions')) {
        const initialData = {};
        mockPosts.forEach(post => {
            initialData[post.id] = {
                likes: post.likes,
                commentCount: post.commentCount,
                reposts: post.reposts,
                liked: false,
                comments: post.comments
            };
        });
        mockCommunityPosts.forEach(post => {
            initialData[post.id] = {
                likes: post.likes,
                commentCount: post.commentCount,
                reposts: post.reposts,
                liked: false,
                comments: post.comments
            };
        });
        localStorage.setItem('postInteractions', JSON.stringify(initialData));
    }
}

// 获取帖子交互数据
function getPostInteractions(postId) {
    const interactions = JSON.parse(localStorage.getItem('postInteractions'));
    return interactions[postId] || {
        likes: 0,
        commentCount: 0,
        reposts: 0,
        liked: false,
        comments: []
    };
}

// 更新帖子交互数据（本地化存储）
function updatePostInteractions(postId, type, value) {
    const interactions = JSON.parse(localStorage.getItem('postInteractions'));
    if (!interactions[postId]) {
        interactions[postId] = {
            likes: 0,
            commentCount: 0,
            reposts: 0,
            liked: false,
            comments: []
        };
    }
    
    if (type === 'like') {
        interactions[postId].liked = value;
        interactions[postId].likes += value ? 1 : -1;
    } else if (type === 'comment') {
        interactions[postId].comments.push(value);
        interactions[postId].commentCount = interactions[postId].comments.length;
    } else if (type === 'repost') {
        interactions[postId].reposts += 1;
    }
    
    localStorage.setItem('postInteractions', JSON.stringify(interactions));
}

// 创建动态卡片
function createPostCard(post) {
    const interactions = getPostInteractions(post.id);
    return `
        <div class="post-card" onclick="showPostDetail(this)" data-post-id="${post.id}">
            <div class="post-images">
                <img src="${post.images[0]}" alt="动态图片">
            </div>
            <h3 class="post-title" style="font-weight: 500;">${processHashtags(post.title)}</h3>
            <div class="post-content">
                <div class="user-info" style="display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center;">
                        <img src="${post.avatar}" alt="${post.author}" class="post-avatar">
                        <div class="post-info" style="margin-left: 10px;">
                            <span class="username">${post.author}</span>
                            <span class="post-time">${post.timestamp}</span>
                        </div>
                    </div>
                    <div class="action-buttons" style="display: flex; gap: 24px; font-size: 16px;">
                        <button class="action-btn like-btn ${interactions.liked ? 'liked' : ''}" onclick="handleLike(this, event)" style="font-size: 16px;">
                            <i class="fas fa-heart" style="font-size: 20px;"></i>
                            <span>${interactions.likes}</span>
                        </button>
                    </div>
                </div>
                <p class="post-content-text">${post.content}</p>
            </div>
        </div>
    `;
}

// 创建社区动态卡片
function createCommunityPostCard(post) {
    return `
        <div class="community-post-card" onclick="showPostDetail(this)">
            <div class="community-post-content">
                <div class="community-user-info" style="display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center;">
                        <img src="${post.avatar}" alt="${post.author}" class="community-post-avatar">
                        <div class="community-post-info" style="margin-left: 10px;">
                            <span class="community-username">${post.author}</span>
                            <span class="community-post-time">${post.timestamp}</span>
                        </div>
                    </div>
                </div>
                <h3 class="community-post-title" style="font-weight: 500;">${processHashtags(post.title)}</h3>
                <p class="community-post-content-text">${post.content}</p>
                <div class="community-post-images">
                    ${post.images.length > 0 ? `<img src="${post.images[0]}" alt="动态图片">` : ''}
                </div>
                <div class="community-action-buttons" style="display: flex; justify-content: center; gap: 24px; font-size: 16px;">
                    <button class="community-action-btn community-comment-btn" onclick="handleComment(this, event)" style="font-size: 16px;">
                        <i class="fas fa-comment" style="font-size: 20px;"></i>
                        <span>${post.commentCount}</span>
                    </button>
                    <button class="community-action-btn community-share-btn" onclick="handleShare(this, event)" style="font-size: 16px;">
                        <i class="fas fa-retweet" style="font-size: 20px;"></i>
                        <span>${post.reposts}</span>
                    </button>
                    <button class="community-action-btn community-like-btn" onclick="handleLike(this, event)" style="font-size: 16px;">
                        <i class="fas fa-heart" style="font-size: 20px;"></i>
                        <span>${post.likes}</span>
                    </button>
                </div>
                <div class="community-comments"></div>
            </div>
        </div>
    `;
}

// 显示帖子详情
function showPostDetail(card) {
    document.body.style.overflow = 'hidden';
    const overlay = document.createElement('div');
    overlay.className = 'post-overlay';

    // 获取原卡片位置和尺寸
    const rect = card.getBoundingClientRect();
    const detailCard = document.createElement('div');
    detailCard.className = 'post-detail-card';
    detailCard.style.display = 'none'; // 初始隐藏

    // 获取帖子ID
    const postId = card.getAttribute('data-post-id');
    const post = mockPosts.find(p => p.id === parseInt(postId));
    const interactions = getPostInteractions(postId);

    // 预先写好放大后的卡片HTML结构
    detailCard.innerHTML = `
        <div class="post-images"></div>
        <div class="post-content">
            <div class="user-info">
                <img src="${card.querySelector('.post-avatar').src}" alt="${card.querySelector('.username').textContent}" class="post-avatar">
                <div class="post-info">
                    <span class="username">${card.querySelector('.username').textContent}</span>
                    <span class="post-time">${card.querySelector('.post-time').textContent}</span>
                </div>
                <div class="user-actions">
                    <button class="follow-btn" style="background-color: #FF69B4; color: white; border: none; padding: 8px 16px; border-radius: 20px; font-weight: bold; cursor: pointer; margin-right: 10px;">
                        <i class="fas fa-plus"></i> 关注
                    </button>
                    <button class="share-btn" style="background-color: #1DA1F2; color: white; border: none; padding: 8px 16px; border-radius: 20px; font-weight: bold; cursor: pointer;">
                        <i class="fas fa-share"></i> 分享
                    </button>
                </div>
            </div>
            <h3 class="post-title" style="font-weight: 500; margin: 15px 0;">${processHashtags(post.title)}</h3>
            <p class="post-text" style="font-size: 16px; line-height: 1.6; color: #333; margin: 15px 0;">${post.content}</p>
            <div class="comments-section" style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px;">
                <h4 style="font-size: 16px; color: #333; margin-bottom: 15px;">评论 (${post.commentCount})</h4>
                <div class="comments-list" style="display: flex; flex-direction: column; gap: 15px;">
                    ${post.comments && post.comments.length > 0 ? post.comments.map(comment => `
                        <div class="comment-item" style="padding: 10px; background: #f8f8f8; border-radius: 8px;">
                            <div class="comment-user" style="display: flex; align-items: center; gap: 8px; margin-bottom: 5px;">
                                <img src="${post.avatar}" alt="${comment.user}" class="comment-avatar" style="width: 24px; height: 24px; border-radius: 50%;">
                                <span class="comment-username" style="font-weight: 500; font-size: 14px;">${comment.user}</span>
                                <span class="comment-time" style="color: #666; font-size: 12px;">${comment.timestamp}</span>
                            </div>
                            <p class="comment-content" style="font-size: 14px; color: #333; margin-left: 32px;">${comment.content}</p>
                        </div>
                    `).join('') : '<div style="text-align: center; color: #666; padding: 20px;">暂无评论</div>'}
                </div>
                <div class="comment-input-container" style="margin-top: 20px; display: flex; gap: 10px;">
                    <input type="text" class="comment-input" placeholder="写下你的评论..." style="flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 20px; font-size: 14px;">
                    <button class="send-comment-btn" onclick="sendComment(event)" style="background: none; border: none; color: #1da1f2; cursor: pointer; font-size: 18px;">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
            <div class="post-detail-card"></div>
        </div>
    `;
    
    // 填充内容
    const postImages = card.querySelector('.post-images');
    detailCard.querySelector('.post-images').innerHTML = postImages ? postImages.innerHTML : '';

    overlay.appendChild(detailCard);
    document.body.appendChild(overlay);

    // 显示卡片并触发动画
    detailCard.style.display = 'flex';
    detailCard.style.top = rect.top + 'px';
    detailCard.style.left = rect.left + 'px';
    detailCard.style.width = rect.width + 'px';
    detailCard.style.height = rect.height + 'px';
    detailCard.style.margin = 0;
    detailCard.style.transform = 'none';

    // 动画到中央
    setTimeout(() => {
        detailCard.style.transition = 'all 0.5s cubic-bezier(0.4,0,0.2,1)';
        detailCard.style.top = '50%';
        detailCard.style.left = '50%';
        detailCard.style.width = '900px'; // 设置宽度为900px
        detailCard.style.height = 'auto';
        detailCard.style.transform = 'translate(-50%, -50%)';
        overlay.classList.add('active');
    }, 10);

    // 阻止冒泡
    detailCard.onclick = e => e.stopPropagation();
    overlay.onclick = function(e) {
        if (e.target === overlay) {
            // 关闭动画
            detailCard.style.transition = 'all 0.5s cubic-bezier(0.4,0,0.2,1)';
            detailCard.style.top = rect.top + 'px';
            detailCard.style.left = rect.left + 'px';
            detailCard.style.width = rect.width + 'px';
            detailCard.style.height = rect.height + 'px';
            detailCard.style.transform = 'none';
            overlay.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(overlay);
                document.body.style.overflow = '';
            }, 500);
        }
    };
}

// 加载动态流
function loadFeed() {
    const feedContent = document.querySelector('.post-feed');
    if (feedContent) {
        feedContent.innerHTML = mockPosts.map(post => createPostCard(post)).join('');
    }
}

// 加载社区动态流
function loadCommunityFeed() {
    const communityFeed = document.querySelector('#community .post-feed');
    if (communityFeed) {
        communityFeed.innerHTML = mockCommunityPosts.map(post => createCommunityPostCard(post)).join('');
    }
}

// 处理标签页切换
function handleTabs() {
    const tabs = document.querySelectorAll('.tabs-container a');
    const sections = document.querySelectorAll('.feed-section');

    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 如果是关注标签且未登录
            if (this.textContent === '关注' && !localStorage.getItem('isLoggedIn')) {
                handleUnauthorizedAction('查看关注内容');
                return;
            }

            // 移除所有活动状态
            tabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => s.style.display = 'none');

            // 添加新的活动状态
            this.classList.add('active');
            const targetId = this.textContent === '推荐' ? 'recommended' : 
                           this.textContent === '社区' ? 'community' :
                           this.textContent === '热门' ? 'hot' : 'following';
            document.getElementById(targetId).style.display = 'block';
        });
    });
}

// 检查登录状态
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    document.getElementById('notLoggedIn').style.display = isLoggedIn ? 'none' : 'block';
    document.getElementById('loggedIn').style.display = isLoggedIn ? 'block' : 'none';
}

// 未登录时的操作处理
function handleUnauthorizedAction(action) {
    const confirmed = confirm(`需要登录才能${action}，是否前往登录？`);
    if (confirmed) {
        window.location.href = '../login page/login.html';
    }
}

// 为所有需要登录的操作添加事件监听
document.addEventListener('DOMContentLoaded', function() {
    // 检查登录状态
    checkLoginStatus();

    // 发布按钮
    document.querySelector('.publish-btn').addEventListener('click', function(e) {
        if (!localStorage.getItem('isLoggedIn')) {
            e.preventDefault();
            handleUnauthorizedAction('发布内容');
        }
    });

    // 私信按钮
    document.querySelector('.text-btn i.fa-envelope').parentElement.addEventListener('click', function(e) {
        if (!localStorage.getItem('isLoggedIn')) {
            e.preventDefault();
            handleUnauthorizedAction('发送私信');
        }
    });

    // 消息按钮
    document.querySelector('.text-btn i.fa-comment').parentElement.addEventListener('click', function(e) {
        if (!localStorage.getItem('isLoggedIn')) {
            e.preventDefault();
            handleUnauthorizedAction('查看消息');
        }
    });

    // 历史按钮
    document.querySelector('.text-btn i.fa-history').parentElement.addEventListener('click', function(e) {
        if (!localStorage.getItem('isLoggedIn')) {
            e.preventDefault();
            handleUnauthorizedAction('查看历史');
        }
    });

    // 为动态加载的内容添加事件委托
    document.querySelector('.post-feed').addEventListener('click', function(e) {
        if (!localStorage.getItem('isLoggedIn')) {
            const target = e.target;
            
            // 点赞按钮
            if (target.closest('.like-btn') || target.closest('.fa-heart')) {
                e.preventDefault();
                handleUnauthorizedAction('点赞');
            }
            
            // 评论按钮
            if (target.closest('.comment-btn') || target.closest('.fa-comment')) {
                e.preventDefault();
                handleUnauthorizedAction('评论');
            }
            
            // 转发按钮
            if (target.closest('.share-btn') || target.closest('.fa-share')) {
                e.preventDefault();
                handleUnauthorizedAction('转发');
            }
            
            // 关注按钮
            if (target.closest('.follow-btn') || target.closest('.fa-user-plus')) {
                e.preventDefault();
                handleUnauthorizedAction('关注');
            }
        }
    });
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initializeLocalStorage();
    loadFeed();
    handleTabs();
    
    // 初始加载社区内容
    const communitySection = document.getElementById('community');
    if (communitySection) {
        const communityFeed = communitySection.querySelector('.post-feed');
        if (communityFeed) {
            communityFeed.innerHTML = mockCommunityPosts.map(post => createCommunityPostCard(post)).join('');
        }
    }
});

// 黑暗模式切换
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// 检查本地存储中的主题设置
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
} else if (prefersDarkScheme.matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
}

// 更新主题图标
function updateThemeIcon(theme) {
    const sunIcon = themeToggle.querySelector('.fa-sun');
    const moonIcon = themeToggle.querySelector('.fa-moon');
    if (theme === 'dark') {
        sunIcon.style.display = 'inline-block';
        moonIcon.style.display = 'none';
    } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline-block';
    }
}

// 切换主题
themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        updateThemeIcon('light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon('dark');
    }
});

// 修改处理点赞函数
function handleLike(button, event) {
    event.stopPropagation();
    
    if (!localStorage.getItem('isLoggedIn')) {
        handleUnauthorizedAction('点赞');
        return;
    }
    
    const postCard = button.closest('.post-card');
    const postId = postCard.dataset.postId;
    const isLiked = button.classList.contains('liked');
    
    // 更新本地存储
    updatePostInteractions(postId, 'like', !isLiked);
    
    // 更新UI
    const likeCount = button.querySelector('span');
    if (isLiked) {
        button.classList.remove('liked');
    } else {
        button.classList.add('liked');
    }
    
    // 重新加载内容以更新计数
    const currentTab = document.querySelector('.tabs-container a.active').textContent;
    if (currentTab === '推荐') {
        loadFeed();
    } else if (currentTab === '热门') {
        const hotFeed = document.querySelector('#hot .post-feed');
        if (hotFeed) {
            const sortedPosts = [...mockPosts].sort((a, b) => {
                const aInteractions = getPostInteractions(a.id);
                const bInteractions = getPostInteractions(b.id);
                return bInteractions.likes - aInteractions.likes;
            });
            hotFeed.innerHTML = sortedPosts.map(post => createPostCard(post)).join('');
        }
    }
}

// 修改处理评论函数
function handleComment(button, event) {
    event.stopPropagation();
    
    if (!localStorage.getItem('isLoggedIn')) {
        handleUnauthorizedAction('评论');
        return;
    }
    
    const postCard = button.closest('.post-card');
    const postId = postCard.dataset.postId;
    const commentInput = postCard.querySelector('.comment-input');
    
    if (!commentInput) {
        // 创建评论输入框
        const inputHTML = `
            <div class="comment-input" style="display: flex; margin-top: 10px;">
                <input type="text" placeholder="写下你的评论..." style="flex: 1; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                <button onclick="submitComment(this, event)" style="margin-left: 8px; padding: 8px 16px; background: #ff2442; color: white; border: none; border-radius: 4px; cursor: pointer;">发送</button>
            </div>
        `;
        postCard.querySelector('.comments').insertAdjacentHTML('beforeend', inputHTML);
        postCard.querySelector('.comment-input input').focus();
    } else {
        commentInput.style.display = commentInput.style.display === 'none' ? 'flex' : 'none';
        if (commentInput.style.display === 'flex') {
            commentInput.querySelector('input').focus();
        }
    }
}

// 添加提交评论函数
function submitComment(button, event) {
    event.stopPropagation();
    
    const commentInput = button.previousElementSibling;
    const content = commentInput.value.trim();
    
    if (content) {
        const postCard = button.closest('.post-card');
        const postId = postCard.dataset.postId;
        
        // 更新本地存储
        updatePostInteractions(postId, 'comment', {
            user: '当前用户',
            content: content,
            timestamp: new Date().toLocaleString()
        });
        
        // 清空输入框
        commentInput.value = '';
        
        // 重新加载内容以更新评论
        const currentTab = document.querySelector('.tabs-container a.active').textContent;
        if (currentTab === '推荐') {
            loadFeed();
        } else if (currentTab === '热门') {
            const hotFeed = document.querySelector('#hot .post-feed');
            if (hotFeed) {
                const sortedPosts = [...mockPosts].sort((a, b) => {
                    const aInteractions = getPostInteractions(a.id);
                    const bInteractions = getPostInteractions(b.id);
                    return bInteractions.likes - aInteractions.likes;
                });
                hotFeed.innerHTML = sortedPosts.map(post => createPostCard(post)).join('');
            }
        }
    }
}

// 修改处理转发函数
function handleShare(button, event) {
    event.stopPropagation();
    
    if (!localStorage.getItem('isLoggedIn')) {
        handleUnauthorizedAction('转发');
        return;
    }
    
    const postCard = button.closest('.post-card');
    const postId = postCard.dataset.postId;
    
    // 更新本地存储
    updatePostInteractions(postId, 'repost', true);
    
    // 更新UI
    const repostCount = button.querySelector('span');
    repostCount.textContent = parseInt(repostCount.textContent) + 1;
    
    // 显示转发成功提示
    alert('转发成功！');
}

// 测试登录和未登录状态下的交互
const loginbtn = document.getElementById("notLoggedIn");
loginbtn.addEventListener('click',function(){
    localStorage.setItem('isLoggedIn',true);
    updateLoginStatus();
})

function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    updateLoginStatus();
}

// 在页面加载时添加退出登录按钮的事件监听
document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.querySelector('.menu-item:last-child');
    logoutButton.addEventListener('click', function(event) {
        event.preventDefault(); // 阻止默认行为
        handleLogout(); // 调用退出登录处理函数
    });
});

function updateLoginStatus() {
    const loggedInDiv = document.getElementById('loggedIn');
    const notLoggedInDiv = document.getElementById('notLoggedIn');

    if (localStorage.getItem('isLoggedIn') === 'true') {
        loggedInDiv.style.display = 'block';
        notLoggedInDiv.style.display = 'none';
    } else {
        loggedInDiv.style.display = 'none';
        notLoggedInDiv.style.display = 'block';
    }
}

function updateRecommendations() {
    const posts = mockPosts.sort((a, b) => b.likes - a.likes); // 根据点赞数排序
    const feedSection = document.querySelector('.post-feed');
    feedSection.innerHTML = ''; // 清空当前内容
    posts.forEach(post => {
        feedSection.innerHTML += createPostCard(post); // 重新渲染动态卡片
    });
    showNewContentNotification(); // 显示新内容通知
}

// 在页面加载时调用更新推荐内容
document.addEventListener('DOMContentLoaded', function() {
    updateRecommendations();
    // 设置定时器，定期更新推荐内容
    setInterval(updateRecommendations, 60000); // 每分钟更新一次
});

// 添加简洁动效提示新内容
function showNewContentNotification() {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = '有新内容！';
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000); // 3秒后移除通知
}

function showPublishBox() {
    if (!localStorage.getItem('isLoggedIn')) {
        return;
    }
    const overlay = document.createElement('div');
    overlay.className = 'publish-overlay';
    overlay.innerHTML = `
        <div class="publish-box">
            <h2>发布动态</h2>
            <input type="text" placeholder="标题" class="publish-title">
            <textarea placeholder="分享你的想法..."></textarea>
            <div class="input-group">
                <label><i class="fas fa-image"></i> 上传图片</label>
                <input type="file" accept="image/*" class="publish-image-upload">
                <div class="image-preview"></div>
            </div>
            <div class="recommended-tags">
                <span class="tag">#校园生活</span>
                <span class="tag">#学习</span>
                <span class="tag">#美食</span>
                <span class="tag">#旅行</span>
            </div>
            <div class="btn-group">
                <button class="publish-cancel">取消</button>
                <button class="publish-submit">发布</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    // 处理图片上传预览
    const imageUpload = overlay.querySelector('.publish-image-upload');
    const imagePreview = overlay.querySelector('.image-preview');
    
    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.innerHTML = `<img src="${e.target.result}" alt="预览图片">`;
            }
            reader.readAsDataURL(file);
        }
    });

    // 处理取消按钮
    overlay.querySelector('.publish-cancel').addEventListener('click', function() {
        overlay.remove();
    });

    // 处理发布按钮
    overlay.querySelector('.publish-submit').addEventListener('click', function() {
        const title = overlay.querySelector('.publish-title').value;
        const content = overlay.querySelector('textarea').value;
        const imageFile = overlay.querySelector('.publish-image-upload').files[0];
        
        if (content.trim()) {
            // 处理发布逻辑
            alert('发布成功！');
            overlay.remove();
        } else {
            alert('内容不能为空！');
        }
    });

    // 处理标签点击
    overlay.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', function() {
            const content = overlay.querySelector('textarea');
            content.value += this.textContent + ' ';
        });
    });
}

// 在页面加载时添加发布按钮的事件监听
document.addEventListener('DOMContentLoaded', function() {
    if(!localStorage.getItem('isLoggedIn')){
        return;
    }
    const publishButton = document.querySelector('.publish-btn');
    publishButton.addEventListener('click', showPublishBox);
});
