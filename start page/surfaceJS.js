// 模拟动态数据
const mockPosts = [
    {
        id: 1,
        author: 'Sun_foto',
        avatar: 'imgs/Sun_foto.jpg',
        content: '深大 | 像是通往另一个世界的入口',
        images: ['imgs/深大像是通往另一个世界的入口.jpg'],
        timestamp: '10分钟前',
        likes: 15,
        reposts: 5,
        comments: 3
    },
    {
        id: 2,
        author: '怡宝呀',
        avatar: 'imgs/怡宝呀.jpg',
        content: '深大你活动是真的多',
        images: ['imgs/深大你活动是真的多.jpg'],
        timestamp: '30分钟前',
        likes: 28,
        reposts: 12,
        comments: 8
    },
    {
        id: 3,
        author: '王五',
        avatar: 'imgs/7.png',
        content: '校园的春天真美！ #校园生活 #春天 #美景 #樱花季',
        images: ['imgs/1.png'],
        timestamp: '1小时前',
        likes: 42,
        reposts: 18,
        comments: 15
    },
    {
        id: 4,
        author: '阿佩怡',
        avatar: 'imgs/阿佩怡.jpg',
        content: '祝毕业快乐，前程似锦！🎓',
        images: ['imgs/祝毕业快乐，前程似锦.jpg'],
        timestamp: '2小时前',
        likes: 156,
        reposts: 45,
        comments: 32
    },
    {
        id: 5,
        author: '孙七',
        avatar: 'imgs/5.png',
        content: '图书馆学习的一天，充实而美好！ #学习 #校园生活 #图书馆',
        images: ['imgs/6.png'],
        timestamp: '3小时前',
        likes: 89,
        reposts: 23,
        comments: 17
    },
    {
        id: 6,
        author: '周八',
        avatar: 'imgs/7.png',
        content: '分享一张校园晚霞，美得让人心醉！ #校园生活 #晚霞 #美景 #摄影',
        images: ['imgs/1.png'],
        timestamp: '4小时前',
        likes: 203,
        reposts: 67,
        comments: 45
    }
];

// 模拟社区数据
const mockCommunityPosts = [
    {
        id: 1,
        author: '不爱吃芋头',
        avatar: 'imgs/7.png',
        content: '崩溃了，丽湖宵夜街来碗馄饨\n' + 
                 '当着我们的面，把掉在石板的馄饨都放回去煮！！！！！！\n' +
                 '掉在地上的有些扔垃圾桶，有些收起来了！！！\n' +
                 '每天晚上都要吃的小女孩心碎！！！前两天下大雨打风\n' +
                 '我都去！\n' +
                 '粉转黑了！',
        images: [],
        timestamp: '2小时前',
        likes: 45,
        reposts: 12,
        comments: 23
    },
    {
        id: 2,
        author: '还行',
        avatar: 'imgs/5.png',
        content: '深大的成绩单可以只打印没有挂科的吗',
        images: [],
        timestamp: '3小时前',
        likes: 36,
        reposts: 9,
        comments: 18
    },
    {
        id: 3,
        author: '一根小海草',
        avatar: 'imgs/7.png',
        content: '完蛋了，积极心理学没期末线上考试，有没有同学记得期末成绩各项占比',
        images: [],
        timestamp: '4小时前',
        likes: 28,
        reposts: 7,
        comments: 15
    }
];

// 处理话题标签
function processHashtags(content) {
    // 直接返回内容，不处理标签
    return content;
}

// 创建动态卡片
function createPostCard(post) {
    return `
        <div class="post-card">
            <div class="post-images">
                <img src="${post.images[0]}" alt="动态图片">
            </div>
            <div class="post-content">
                <h3>${processHashtags(post.content)}</h3>
            </div>
            <div class="post-header">
                <img src="${post.avatar}" alt="${post.author}" class="post-avatar">
                <div class="post-info">
                    <span class="username">${post.author}</span>
                    <span class="post-time">${post.timestamp}</span>
                </div>
            </div>
            <div class="post-footer">
                <button class="action-btn">
                    <i class="fas fa-comment"></i>
                    <span>${post.comments}</span>
                </button>
                <button class="action-btn">
                    <i class="fas fa-retweet"></i>
                    <span>${post.reposts}</span>
                </button>
                <button class="action-btn">
                    <i class="fas fa-heart"></i>
                    <span>${post.likes}</span>
                </button>
            </div>
        </div>
    `;
}

// 创建社区动态卡片
function createCommunityPostCard(post) {
    return `
        <div class="post-card">
            <div class="post-header">
                <img src="${post.avatar}" alt="${post.author}" class="post-avatar">
                <div class="post-info">
                    <span class="username">${post.author}</span>
                    <span class="post-time">${post.timestamp}</span>
                </div>
            </div>
            <div class="post-content">
                <p>${post.content}</p>
                ${post.images.length > 0 ? `
                    <div class="post-images">
                        <img src="${post.images[0]}" alt="动态图片">
                    </div>
                ` : ''}
            </div>
            <div class="post-footer">
                <button class="action-btn">
                    <i class="fas fa-comment"></i>
                    <span>${post.comments}</span>
                </button>
                <button class="action-btn">
                    <i class="fas fa-retweet"></i>
                    <span>${post.reposts}</span>
                </button>
                <button class="action-btn">
                    <i class="fas fa-heart"></i>
                    <span>${post.likes}</span>
                </button>
            </div>
        </div>
    `;
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
    const tabs = document.querySelectorAll('.feed-tabs a');
    const sections = document.querySelectorAll('.feed-section');
    
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 移除所有标签的active类
            tabs.forEach(t => t.classList.remove('active'));
            // 给当前点击的标签添加active类
            tab.classList.add('active');
            
            // 隐藏所有section
            sections.forEach(section => {
                section.style.display = 'none';
            });
            
            // 显示对应的section
            if (index === 0) { // 推荐
                sections[0].style.display = 'block';
            } else if (index === 1) { // 社区
                const communitySection = document.getElementById('community');
                communitySection.style.display = 'block';
                // 确保社区内容被加载
                const communityFeed = communitySection.querySelector('.post-feed');
                if (communityFeed) {
                    communityFeed.innerHTML = mockCommunityPosts.map(post => createCommunityPostCard(post)).join('');
                }
            }
        });
    });
}

// 处理登录状态
function handleLoginState() {
    const notLoggedIn = document.getElementById('notLoggedIn');
    const loggedIn = document.getElementById('loggedIn');

    // 模拟登录状态（实际项目中应该从后端获取）
    let isLoggedIn = false;

    // 登录按钮点击事件
    notLoggedIn.addEventListener('click', () => {
        isLoggedIn = true;
        updateLoginState();
    });

    // 退出登录点击事件
    document.querySelector('.menu-item:last-child').addEventListener('click', () => {
        isLoggedIn = false;
        updateLoginState();
    });

    // 更新登录状态显示
    function updateLoginState() {
        if (isLoggedIn) {
            notLoggedIn.style.display = 'none';
            loggedIn.style.display = 'block';
        } else {
            notLoggedIn.style.display = 'flex';
            loggedIn.style.display = 'none';
        }
    }

    // 初始化显示
    updateLoginState();
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    loadFeed();
    handleTabs();
    handleLoginState();
    
    // 初始加载社区内容
    const communitySection = document.getElementById('community');
    if (communitySection) {
        const communityFeed = communitySection.querySelector('.post-feed');
        if (communityFeed) {
            communityFeed.innerHTML = mockCommunityPosts.map(post => createCommunityPostCard(post)).join('');
        }
    }
});
