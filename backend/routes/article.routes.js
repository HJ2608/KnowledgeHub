const router = require('express').Router();
const auth = require('../middleware/auth');
const checkRole = require('../middleware/role');
const {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle
} = require('../controllers/article.controller');
const { summarizeArticle } = require('../controllers/article.controller');


router.post('/:id/summarize', summarizeArticle);
router.use(auth); // Protect all routes below

router.post('/', createArticle);
router.get('/', getAllArticles);
router.get('/:id', getArticleById);
router.put('/:id', updateArticle);
router.delete('/:id', checkRole(['admin']), deleteArticle);

module.exports = router;
