import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

function EditArticle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (!id) return;
    api.get(`/articles/${id}`)
      .then(res => {
        const { title, content, tags } = res.data;
        setTitle(title);
        setContent(content);
        setTags(tags.join(', '));
      })
      .catch(() => alert('Failed to fetch article for editing'));
  }, [id]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    try {
      await api.put(`/articles/${id}`, {
        title,
        content,
        tags: tags.split(',').map(t => t.trim())
      });
      alert('Article updated!');
      navigate('/');
    } catch {
      alert('Failed to update article');
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Edit Article</h2>
      <form onSubmit={handleUpdate}>
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

        <button type="submit">Update Article</button>
      </form>
    </div>
  );
}

export default EditArticle;
