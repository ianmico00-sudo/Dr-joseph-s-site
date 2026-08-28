import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SiteLayout from './layouts/SiteLayout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Insights from './pages/Insights.jsx';
import Analysis from './pages/Analysis.jsx';
import Reflections from './pages/Reflections.jsx';
import MediaConversations from './pages/MediaConversations.jsx';
import InTheNews from './pages/InTheNews.jsx';
import FromMyLibrary from './pages/FromMyLibrary.jsx';
import Contact from './pages/Contact.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="insights" element={<Insights />} />
          <Route path="analysis" element={<Analysis />} />
          <Route path="reflections" element={<Reflections />} />
          <Route path="media-conversations" element={<MediaConversations />} />
          <Route path="in-the-news" element={<InTheNews />} />
          <Route path="from-my-library" element={<FromMyLibrary />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
