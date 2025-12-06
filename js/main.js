/**
 * 李卓然的个人网站 - JavaScript 交互
 * ENFP 风格：活力、创意、有趣
 */

// ============ 页面加载动画 ============
window.addEventListener('load', () => {
  const loader = document.querySelector('.page-loader');
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 500);
});

// ============ 导航栏滚动效果 ============
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  // 添加背景
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ============ 移动端菜单 ============
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });
  
  // 点击链接后关闭菜单
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });
}

// ============ 光标跟随效果 ============
const cursorGlow = document.querySelector('.cursor-glow');

if (cursorGlow && window.innerWidth > 768) {
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });
} else if (cursorGlow) {
  cursorGlow.style.display = 'none';
}

// ============ 滚动显示动画 ============
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const revealPoint = 150;
    
    if (elementTop < windowHeight - revealPoint) {
      element.classList.add('active');
    }
  });
};

// 初始检查
revealOnScroll();

// 滚动时检查
window.addEventListener('scroll', revealOnScroll);

// ============ 平滑滚动 ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ============ 打字机效果（可选） ============
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// ============ 分类标签切换 ============
const categoryTabs = document.querySelectorAll('.category-tab, .filter-tab');

categoryTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // 移除所有活动状态
    tab.parentElement.querySelectorAll('.category-tab, .filter-tab').forEach(t => {
      t.classList.remove('active');
    });
    // 添加当前活动状态
    tab.classList.add('active');
  });
});

// ============ 技能条动画 ============
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkillBars = () => {
  skillBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    
    setTimeout(() => {
      bar.style.width = width;
    }, 500);
  });
};

// 当技能区域进入视口时触发动画
const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  observer.observe(skillsSection);
}

// ============ 数字计数动画 ============
function animateValue(element, start, end, duration) {
  const range = end - start;
  const increment = end > start ? 1 : -1;
  const stepTime = Math.abs(Math.floor(duration / range));
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    element.textContent = current + '+';
    if (current === end) {
      clearInterval(timer);
    }
  }, stepTime);
}

// ============ 表单验证和提交 ============
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // 简单的表单验证
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    inputs.forEach(input => {
      if (input.hasAttribute('required') && !input.value.trim()) {
        isValid = false;
        input.style.borderColor = '#FF6B6B';
      } else {
        input.style.borderColor = '';
      }
    });
    
    if (isValid) {
      // 模拟表单提交
      alert('🎉 消息已发送！感谢你的来信，我会尽快回复你！');
      contactForm.reset();
    }
  });
}

// ============ 添加悬停音效（可选，默认关闭） ============
// const enableSounds = false;
// if (enableSounds) {
//   const hoverSound = new Audio('sounds/hover.mp3');
//   document.querySelectorAll('a, button').forEach(el => {
//     el.addEventListener('mouseenter', () => {
//       hoverSound.currentTime = 0;
//       hoverSound.volume = 0.1;
//       hoverSound.play();
//     });
//   });
// }

// ============ 主题切换（可扩展） ============
// const themeToggle = document.querySelector('.theme-toggle');
// if (themeToggle) {
//   themeToggle.addEventListener('click', () => {
//     document.body.classList.toggle('dark-theme');
//     localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
//   });
//   
//   // 检查保存的主题
//   if (localStorage.getItem('theme') === 'dark') {
//     document.body.classList.add('dark-theme');
//   }
// }

// ============ 随机 ENFP 名言（首页使用） ============
const enfpQuotes = [
  "生活充满无限可能！🌟",
  "每一天都是新的冒险！🚀",
  "创意就是我的超能力！💡",
  "让我们一起改变世界！🌍",
  "保持好奇，保持热情！🔥",
  "想法太多？那是天赋！✨",
  "今天又是充满灵感的一天！🎨",
  "人生苦短，及时行乐！🎉"
];

function getRandomQuote() {
  return enfpQuotes[Math.floor(Math.random() * enfpQuotes.length)];
}

// ============ 控制台彩蛋 ============
console.log(`
%c🦋 欢迎来到李卓然的网站！

%c作为一个 ENFP，我相信：
✨ 每个人都有无限潜力
🎨 创意让世界更美好
🤝 连接让生活更有意义

想聊聊？联系我吧！

`, 
'font-size: 20px; font-weight: bold; color: #FF6B6B;',
'font-size: 14px; color: #636E72;'
);

// ============ 页面可见性 API ============
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    document.title = '👋 想你了... | 李卓然';
  } else {
    document.title = document.querySelector('title').getAttribute('data-original') || '李卓然 | ENFP 探索者 ✨';
  }
});

// 保存原始标题
document.querySelector('title').setAttribute('data-original', document.title);

// ============ 初始化 ============
document.addEventListener('DOMContentLoaded', () => {
  // 添加页面过渡效果
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

