document.addEventListener('DOMContentLoaded', () => {
  const blogList = document.getElementById('blog-list');
  if (!blogList) return;

  fetch('./posts.json')
    .then(res => res.json())
    .then(posts => {
      posts.sort((a, b) => new Date(b.date) - new Date(a.date));

      for (const post of posts) {
        const entry = document.createElement('div');
        entry.className = 'blog-entry';
        entry.innerHTML = `
            <h2><a href="./post.html?post=${post.slug}">${post.title}</a></h2>
            <p class="blog-date">${post.date}</p>
        `;
        blogList.appendChild(entry);
      }
    })
    .catch(err => {
      console.error('Failed to load blog posts:', err);
    });
});