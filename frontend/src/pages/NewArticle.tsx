import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

function NewArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await api.post('/articles', {
        title,
        content,
        tags: tags.split(',').map(t => t.trim())
      });
      alert('Article created successfully!');
      navigate('/');
    } catch (err) {
      alert('Failed to create article');
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>New Article</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        /><br /><br />

        <textarea
          placeholder="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={6}
          cols={40}
          required
        /><br /><br />

        <input
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={e => setTags(e.target.value)}
        /><br /><br />

        <button type="submit">Create Article</button>
      </form>
    </div>
  );
}

export default NewArticle;
