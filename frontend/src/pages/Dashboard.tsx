import { useEffect, useState } from 'react';
import api, { setAuthToken } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { getUserRole } from '../utils/auth';

type Article = {
  _id: string;
  title: string;
  summary?: string;
  tags: string[];
  createdBy: { username: string };
};

function Dashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const navigate = useNavigate();
  const role = getUserRole();
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    setAuthToken(token);

    const fetchArticles = async () => {
      try {
        const res = await api.get('/articles');
        setArticles(res.data);
      } catch (err) {
        alert('Failed to fetch articles');
      }
    };

    fetchArticles();
  }, [navigate]);

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Dashboard</h2>
        <div>
          <button onClick={() => navigate('/article/new')}>Add New Article</button>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              setAuthToken(null);
              navigate('/login');
            }}
            style={{ marginLeft: '1rem' }}
          >
            Logout
          </button>
        </div>
      </div>

      <ul>
        {articles.map((article) => (
          <li key={article._id} style={{ margin: '1rem 0', border: '1px solid #ccc', padding: '1rem' }}>
            <h3>{article.title}</h3>
            <p><strong>Tags:</strong> {article.tags.join(', ')}</p>
            <p><strong>Author:</strong> {article.createdBy?.username}</p>
            <p><strong>Summary:</strong> {article.summary || 'Not summarized yet'}</p>

            <button onClick={() => navigate(`/article/${article._id}`)}>View</button>

            {role === 'admin' && (
              <button onClick={() => navigate(`/article/edit/${article._id}`)} style={{ marginLeft: '0.5rem' }}>
                Edit
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
