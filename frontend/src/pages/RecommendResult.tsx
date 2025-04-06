import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

// 카카오맵 타입 정의
declare global {
  interface Window {
    kakao: any;
  }
}

interface RecommendationData {
  district: string;
  score: number;
  reasons: {
    category: string;
    value: number;
  }[];
  facilities: {
    name: string;
    count: number;
    distance: number;
  }[];
  averagePrice: {
    deposit: number;
    monthlyRent: number;
  };
  safetyScore: number;
  transportation: {
    subway: number;
    bus: number;
  };
}

interface PreferenceData {
  purpose: string;
  preferredDistricts: string[];
  facilities: {
    [key: string]: boolean;
  };
  residenceType: string;
  deposit: string;
  monthlyRent: string;
  transportation: string[];
  maxCommuteTime: number;
  workplaceLocation: string;
}

const COLORS = ['#007AFF', '#FF2D55', '#34C759', '#FF9500', '#5856D6'];

const RecommendResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const preferenceData = location.state as PreferenceData;
  const [recommendationData, setRecommendationData] = useState<RecommendationData>({
    district: preferenceData.preferredDistricts[0] || '강남구',
    score: 85,
    reasons: [
      { category: '교통 편의성', value: 35 },
      { category: '주변 시설', value: 25 },
      { category: '안전도', value: 20 },
      { category: '환경', value: 20 },
    ],
    facilities: [
      { name: '지하철역', count: 3, distance: 0.5 },
      { name: '버스정류장', count: 5, distance: 0.3 },
      { name: '편의점', count: 8, distance: 0.2 },
      { name: '카페', count: 12, distance: 0.4 },
      { name: '병원', count: 2, distance: 0.8 },
    ],
    averagePrice: {
      deposit: 10000,
      monthlyRent: 80,
    },
    safetyScore: 85,
    transportation: {
      subway: 3,
      bus: 5,
    },
  });

  useEffect(() => {
    // 카카오맵 초기화
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&libraries=services,clusterer`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const container = document.getElementById('map');
      if (!container) return;

      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780),
        level: 3,
      };
      const map = new window.kakao.maps.Map(container, options);

      // 마커 생성
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(37.5665, 126.9780),
      });
      marker.setMap(map);
    };

    return () => {
      const scriptElement = document.querySelector('script[src*="dapi.kakao.com"]');
      if (scriptElement) {
        document.head.removeChild(scriptElement);
      }
    };
  }, []);

  const handleRestart = () => {
    navigate('/preference');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: '24px',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              background: 'linear-gradient(90deg, #007AFF 0%, #FF2D55 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            추천 결과
          </Typography>
          <Button
            variant="outlined"
            onClick={handleRestart}
            sx={{
              borderRadius: '12px',
              px: 3,
              py: 1,
              borderColor: '#007AFF',
              color: '#007AFF',
              '&:hover': {
                borderColor: '#0056b3',
                color: '#0056b3',
              },
            }}
          >
            다시하기
          </Button>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 4 }}>
          {/* 지도 섹션 */}
          <Card
            sx={{
              height: '500px',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div id="map" style={{ width: '100%', height: '100%' }} />
          </Card>

          {/* 추천 정보 섹션 */}
          <Stack spacing={3}>
            <Card
              sx={{
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  추천 지역: {recommendationData.district}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h4" color="primary" sx={{ mr: 1 }}>
                    {recommendationData.score}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    / 100
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                  {recommendationData.reasons.map((reason, index) => (
                    <Chip
                      key={reason.category}
                      label={`${reason.category}: ${reason.value}%`}
                      sx={{
                        backgroundColor: `${COLORS[index]}20`,
                        color: COLORS[index],
                        fontWeight: 500,
                        borderRadius: '20px',
                      }}
                    />
                  ))}
                </Stack>
              </CardContent>
            </Card>

            <Card
              sx={{
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  주변 시설
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={recommendationData.facilities}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#007AFF" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>

            <Card
              sx={{
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  추천 이유
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={recommendationData.reasons}
                        dataKey="value"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {recommendationData.reasons.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>

            <Card
              sx={{
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  상세 정보
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="평균 시세"
                      secondary={`보증금 ${recommendationData.averagePrice.deposit.toLocaleString()}만원 / 월세 ${recommendationData.averagePrice.monthlyRent.toLocaleString()}만원`}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="안전도"
                      secondary={`${recommendationData.safetyScore}점`}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="교통"
                      secondary={`지하철 ${recommendationData.transportation.subway}개 / 버스 ${recommendationData.transportation.bus}개`}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default RecommendResult; 