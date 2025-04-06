import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PreferenceForm from './pages/PreferenceForm';
import RecommendResult from './pages/RecommendResult';
import RegionSelection from './pages/RegionSelection';

const theme = createTheme({
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/preference" element={<PreferenceForm />} />
                    <Route path="/region-selection" element={<RegionSelection />} />
                    <Route path="/result" element={<RecommendResult />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
