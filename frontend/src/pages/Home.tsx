import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 700,
          background: 'linear-gradient(90deg, #007AFF 0%, #FF2D55 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 4,
        }}
      >
        서울 지역 추천 서비스
      </Typography>
      
      <Typography variant="h5" color="text.secondary" paragraph>
        당신의 선호도에 맞는 최적의 서울 지역을 찾아드립니다
      </Typography>

      <Box sx={{ mt: 6 }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/preference')}
          sx={{
            py: 2,
            px: 4,
            fontSize: '1.2rem',
            borderRadius: '12px',
            background: 'linear-gradient(90deg, #007AFF 0%, #FF2D55 100%)',
            '&:hover': {
              background: 'linear-gradient(90deg, #0066CC 0%, #CC2244 100%)',
            },
          }}
        >
          서비스 시작하기
        </Button>
      </Box>

      <Box sx={{ mt: 8 }}>
        <Typography variant="h6" gutterBottom>
          주요 기능
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 2 }}>
          <Box>
            <Typography variant="subtitle1" color="primary">선호도 기반 추천</Typography>
            <Typography variant="body2" color="text.secondary">사용자의 선호도를 반영한 맞춤 추천</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" color="primary">실시간 데이터</Typography>
            <Typography variant="body2" color="text.secondary">최신 부동산 및 지역 정보 제공</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" color="primary">상세 분석</Typography>
            <Typography variant="body2" color="text.secondary">지역별 상세 정보와 추천 근거 제공</Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Home; 