import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material';

import FieldSelection from './components/FieldSelection';
import QuizForm from './components/QuizForm';
import ResultDisplay from './components/ResultDisplay';
import Login from './components/auth/Login';
import SignIn from './components/auth/SignIn';
import Home from './Home';
import Profile from './components/user/Profile';
import Admin from './components/admin/Admin';
import { FieldOption, QuizResult } from './types';

const theme = createTheme({
  palette: {
    primary: { main: '#3f51b5' },
  },
});

function QuizPage() {
  const [fields, setFields] = useState<FieldOption[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {!fields.length ? (
        <FieldSelection
          onSelect={(f) => {
            setFields(f);
            setResult(null);
          }}
        />
      ) : result ? (
        <ResultDisplay
          result={result}
          selectedFields={fields}
          onRetake={() => setResult(null)}
        />
      ) : (
        <QuizForm
          selectedFields={fields}
          onResult={setResult}
          onResetSelection={() => setFields([])}
        />
      )}
    </Container>
  );
}


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
