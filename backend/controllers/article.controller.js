const Article = require('../models/Article');
const { summarizeWithLLM } = require('../services/llm.service');




// Create Article
exports.createArticle = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const article = await Article.create({
      title,
      content,
      tags,
      createdBy: req.user.id
    });
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Articles
exports.getAllArticles = async (req, res) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { createdBy: req.user.id };
    const articles = await Article.find(filter).populate('createdBy', 'username');
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Single Article
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate('createdBy', 'username');
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Article
exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });

    if (req.user.id !== article.createdBy.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { title, content, tags } = req.body;
    if (title) article.title = title;
    if (content) article.content = content;
    if (tags) article.tags = tags;
    
    await article.save();
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Article (admin only)
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });

    await article.deleteOne();
    res.json({ message: 'Article deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.summarizeArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });

    const summary = await summarizeWithLLM(article.content, 'openai');

    article.summary = summary;
    await article.save();

    res.json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};