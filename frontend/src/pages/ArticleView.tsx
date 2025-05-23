import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

type Article = {
  _id: string;
  title: string;
  content: string;
  summary?: string;
  tags: string[];
  createdBy: { username: string };
};

function ArticleView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    api.get(`/articles/${id}`)
      .then(res => setArticle(res.data))
      .catch(() => alert('Failed to fetch article'));
  }, [id]);

  const handleSummarize = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await api.post(`/articles/${id}/summarize`);
      setArticle(prev => prev ? { ...prev, summary: res.data.summary } : prev);
    } catch {
      alert('Failed to summarize');
    } finally {
      setLoading(false);
    }
  };

  if (!article) return <div>Loading...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{article.title}</h2>
      <p><strong>Author:</strong> {article.createdBy?.username}</p>
      <p><strong>Tags:</strong> {article.tags.join(', ')}</p>
      <hr />
      <p>{article.content}</p>
      <hr />
      <h4>Summary</h4>
      <p>{article.summary || 'No summary yet.'}</p>
      <br />
      <button onClick={handleSummarize} disabled={loading}>
        {loading ? 'Summarizing...' : 'Summarize Article'}
      </button>
      <br /><br />
      <button onClick={() => navigate('/')}>← Back to Dashboard</button>
    </div>
  );
}

export default ArticleView;
