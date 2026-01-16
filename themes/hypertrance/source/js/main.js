document.addEventListener('DOMContentLoaded', function() {
  initBackToTop();
  initGlitchEffect();
  initScrollAnimations();
  initTypewriterEffect();
});

function initBackToTop() {
  const backToTop = document.getElementById('backToTop');
  if (!backToTop) return;
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  
  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

function initGlitchEffect() {
  const glitchElements = document.querySelectorAll('.glitch');
  glitchElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      this.style.animationPlayState = 'paused';
    });
    
    element.addEventListener('mouseleave', function() {
      this.style.animationPlayState = 'running';
    });
  });
}

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  const animatedElements = document.querySelectorAll('.post-card, .action-card');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  document.querySelectorAll('.animate-in').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  });
}

function initTypewriterEffect() {
  const typewriterElements = document.querySelectorAll('.typing-effect');
  typewriterElements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    element.style.borderRight = '2px solid var(--color-primary)';
    
    let i = 0;
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, 50);
      } else {
        setTimeout(() => {
          element.style.borderRight = 'none';
        }, 1000);
      }
    }
    
    setTimeout(type, 500);
  });
}

function copyCode(button, codeBlock) {
  const code = codeBlock.textContent;
  navigator.clipboard.writeText(code).then(function() {
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.style.background = 'var(--color-secondary)';
    button.style.color = 'var(--color-background)';
    
    setTimeout(function() {
      button.textContent = originalText;
      button.style.background = '';
      button.style.color = '';
    }, 2000);
  }).catch(function(err) {
    console.error('Failed to copy:', err);
  });
}

document.querySelectorAll('pre').forEach(pre => {
  const button = document.createElement('button');
  button.className = 'copy-code-btn';
  button.textContent = 'Copy';
  button.style.cssText = `
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 5px 10px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 4px;
    color: var(--color-text-muted);
    font-size: 0.8rem;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;
  
  pre.style.position = 'relative';
  pre.appendChild(button);
  
  pre.addEventListener('mouseenter', function() {
    button.style.opacity = '1';
  });
  
  pre.addEventListener('mouseleave', function() {
    button.style.opacity = '0';
  });
  
  button.addEventListener('click', function() {
    copyCode(button, pre);
  });
});
