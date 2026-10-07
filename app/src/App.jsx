import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import SiteLayout from './layouts/SiteLayout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import ArticleSection from './pages/ArticleSection.jsx';
import ArticleDetail from './pages/ArticleDetail.jsx';
import Media from './pages/Media.jsx';
import InTheNews from './pages/InTheNews.jsx';
import Library from './pages/Library.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

// Earlier builds used /insights/<slug> style article links; send those to the new address.
function OldArticleLink() {
  const { slug } = useParams();
  return <Navigate to={`/articles/${slug}`} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="insights" element={<ArticleSection key="insights" section="insights" />} />
          <Route path="analysis" element={<ArticleSection key="analysis" section="analysis" />} />
          <Route path="reflections" element={<ArticleSection key="reflections" section="reflections" />} />
          <Route path="articles/:slug" element={<ArticleDetail />} />
          <Route path="media" element={<Media />} />
          <Route path="in-the-news" element={<InTheNews />} />
          <Route path="library" element={<Library />} />
          <Route path="contact" element={<Contact />} />

          <Route path="insights/:slug" element={<OldArticleLink />} />
          <Route path="analysis/:slug" element={<OldArticleLink />} />
          <Route path="reflections/:slug" element={<OldArticleLink />} />
          <Route path="media-conversations" element={<Navigate to="/media" replace />} />
          <Route path="from-my-library" element={<Navigate to="/library" replace />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
