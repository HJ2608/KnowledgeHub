import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ArticleView from './pages/ArticleView';
import NewArticle from './pages/NewArticle';
import EditArticle from './pages/EditArticle';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/article/new" element={<NewArticle />} />
        <Route path="/article/:id" element={<ArticleView />} />
        <Route path="/article/edit/:id" element={<EditArticle />} />
      </Routes>
    </div>
  );
}

export default App;
