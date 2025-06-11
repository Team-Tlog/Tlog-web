
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import TlogStartPage from './TlogStartPage';
import TbtiTestPage from './TbtiTestPage';
import TbtiResultPage from './TbtiResultPage';

function App() {

  return (
    <Router>
      <Routes>
        {/* 기본 경로에서 /tlog로 리디렉트 */}
        <Route path="/" element={<Navigate to="/tlog" replace />} />
        <Route path="/tlog" element={<TlogStartPage />} />
        <Route path="/tlog/tbti/test" element={<TbtiTestPage />} />
        <Route path="/tlog/tbti/test/result" element={<TbtiResultPage />} />
      </Routes>
    </Router>
  );

}

export default App;
