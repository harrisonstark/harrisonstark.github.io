document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('post');

  const title = document.getElementById('post-title');
  const content = document.getElementById('post-content');

  if (!slug) {
    title.textContent = "Post not found";
    return;
  }

  try {
    // Optional: fetch post title from posts.json
    const res = await fetch('./posts.json');
    const posts = await res.json();
    const meta = posts.find(p => p.slug === slug);
    if (meta) {
      title.textContent = meta.title;
    } else {
      title.textContent = "Untitled Post";
    }

    // Fetch and insert content
    const postHtml = await fetch(`./posts/${slug}.html`).then(res => res.text());
    content.innerHTML = postHtml;

  } catch (err) {
    console.error(err);
    title.textContent = "Error loading post";
    content.innerHTML = "<p>Something went wrong while loading the blog post.</p>";
  }
});
