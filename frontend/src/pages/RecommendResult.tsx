import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    Box,
    Card,
    CardContent,
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
    dongs: {
        name: string;
        lat: number;
        lng: number;
        score: number;
    }[];
}

interface PreferenceData {
    residenceType: string;
    deposit: string;
    monthlyRent: string;
    preferredDistricts: string[];
    maxCommuteTime: number;
    facilities: {
        [key: string]: boolean;
    };
    workplaceLocation: string;
}

const COLORS = ['#007AFF', '#FF2D55', '#34C759', '#FF9500', '#5856D6'];

const RecommendResult = () => {
    const location = useLocation();
    const preferenceData = location.state as PreferenceData;
    const [recommendationData] = useState<RecommendationData>({
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
        dongs: [
            { name: '역삼동', lat: 37.5006, lng: 127.0369, score: 95 },
            { name: '논현동', lat: 37.5087, lng: 127.0395, score: 92 },
            { name: '삼성동', lat: 37.5145, lng: 127.0629, score: 90 },
            { name: '청담동', lat: 37.5194, lng: 127.0567, score: 88 },
            { name: '도곡동', lat: 37.4909, lng: 127.0552, score: 85 },
        ],
    });

    const initializeMap = useCallback(() => {
        const container = document.getElementById('map');
        if (!container) {
            console.error('Map container not found');
            return;
        }

        try {
            const options = {
                center: new window.kakao.maps.LatLng(37.5006, 127.0369),
                level: 3,
            };
            const map = new window.kakao.maps.Map(container, options);
            console.log('Map initialized successfully');

            // 동 마커 생성
            recommendationData.dongs.forEach((dong) => {
                const marker = new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(dong.lat, dong.lng),
                    map: map,
                });

                // 인포윈도우 생성
                const infowindow = new window.kakao.maps.InfoWindow({
                    content: `
                        <div style="padding: 10px; min-width: 150px;">
                            <div style="font-weight: bold; margin-bottom: 5px;">${dong.name}</div>
                            <div style="color: #007AFF; font-weight: 500;">${dong.score}점</div>
                        </div>
                    `,
                });

                // 마커 클릭 이벤트
                window.kakao.maps.event.addListener(marker, 'click', () => {
                    infowindow.open(map, marker);
                });

                // 마커에 마우스오버 이벤트
                window.kakao.maps.event.addListener(marker, 'mouseover', () => {
                    infowindow.open(map, marker);
                });

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
            </Paper>
        </Container>
    );
};

export default RecommendResult; 