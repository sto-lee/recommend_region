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

                // 동 마커 생성
                recommendationData.dongs.forEach((dong) => {
                    const marker = new window.kakao.maps.Marker({
                        position: new window.kakao.maps.LatLng(dong.lat, dong.lng),
                        map: map,
                    });

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

        // 마커 클릭 이벤트
        window.kakao.maps.event.addListener(marker, 'click', () => {
            infowindow.open(map, marker);
        });

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

                // 마커에 마우스아웃 이벤트
                window.kakao.maps.event.addListener(marker, 'mouseout', () => {
                    infowindow.close();
                });
            });

            // 구 경계 표시
            const geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.addressSearch(recommendationData.district, (result: any, status: any) => {
                if (status === window.kakao.maps.services.Status.OK) {
                    const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                    map.setCenter(coords);
                }
            });
        } catch (error) {
            console.error('Error initializing map:', error);
        }
    }, [recommendationData.district, recommendationData.dongs]);

    useEffect(() => {
        // 카카오맵 API 키 확인
        const KAKAO_MAP_API_KEY = process.env.REACT_APP_KAKAO_MAP_API_KEY;
        if (!KAKAO_MAP_API_KEY) {
            console.error('Kakao Maps API key is not set in environment variables');
            return;
        }

        // 카카오맵 스크립트가 이미 로드되어 있는지 확인
        if (window.kakao && window.kakao.maps) {
            initializeMap();
            return;
        }

        // 카카오맵 스크립트 로드
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&libraries=services,clusterer&autoload=false`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
            console.log('Kakao Maps SDK loaded successfully');
            window.kakao.maps.load(() => {
                initializeMap();
            });
        };

        script.onerror = (error) => {
            console.error('Error loading Kakao Maps SDK:', error);
            console.error('Please check if:');
            console.error('1. API key is correctly set in .env file');
            console.error('2. Domain is registered in Kakao Developers Console');
            console.error('3. API key is valid and active');
        };

        document.head.appendChild(script);

        return () => {
            const scriptElement = document.querySelector('script[src*="dapi.kakao.com"]');
            if (scriptElement) {
                document.head.removeChild(scriptElement);
            }
        };
    }, [initializeMap]);

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
                <Typography
                    variant="h4"
                    gutterBottom
                    align="center"
                    sx={{
                        fontWeight: 600,
                        mb: 4,
                        background: 'linear-gradient(90deg, #007AFF 0%, #FF2D55 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    추천 결과
                </Typography>

                {/* 지도 섹션 */}
                <Card
                    sx={{
                        height: '400px',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                        mb: 4,
                        position: 'relative'
                    }}
                >
                    <div 
                        id="map" 
                        style={{ 
                            width: '100%', 
                            height: '100%',
                            position: 'absolute',
                            top: 0,
                            left: 0
                        }}
                        role="region"
                        aria-label="지도"
                    />
                </Card>

                {/* 추천 정보 섹션 */}
                <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
                    gap: 3 
                }}>
                    {/* 추천 지역 점수 및 이유 */}
                    <Card
                        sx={{
                            borderRadius: '16px',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                추천 지역 점수
                            </Typography>
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                height: '200px'
                            }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={recommendationData.reasons}
                                            dataKey="value"
                                            nameKey="category"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
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

                    {/* 주변 시설 정보 */}
                    <Card
                        sx={{
                            borderRadius: '16px',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                주변 시설
                            </Typography>
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                height: '200px'
                            }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={recommendationData.facilities}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="count" fill="#007AFF" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Box>
                        </CardContent>
                    </Card>
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