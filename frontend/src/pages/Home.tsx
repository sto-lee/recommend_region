import { Box, Container, Typography } from '@mui/material';
import Header from '../components/Layout/Header';
import SearchForm from '../components/Search/SearchForm';

const Home = () => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f5f5f7 0%, #ffffff 100%)',
            }}
        >
            <Header />
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 'calc(100vh - 80px)',
                    py: 4,
                    textAlign: 'center',
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        color: '#1d1d1f',
                        fontWeight: 700,
                        letterSpacing: '-1px',
                        mb: 2,
                    }}
                >
                    당신의 이상적인 주거지를
                </Typography>
                <Typography
                    variant="h2"
                    sx={{
                        color: '#1d1d1f',
                        fontWeight: 700,
                        letterSpacing: '-1px',
                        mb: 6,
                        background: 'linear-gradient(90deg, #007AFF 0%, #FF2D55 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    찾아드립니다
                </Typography>
                <SearchForm />
            </Container>
        </Box>
    );
};

export default Home; 