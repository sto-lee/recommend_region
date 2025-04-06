import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    Box,
    Card,
    Chip,
} from '@mui/material';

interface RegionData {
    name: string;
    district: string;
    score: number;
    commuteTime: number;
    facilities: {
        [key: string]: number;
    };
}

interface LocationState {
    preferenceData: {
        preferredDistricts: string[];
        workplaceLocation: string;
        facilities: {
            [key: string]: boolean;
        };
    };
}

const RegionSelection = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { preferenceData } = location.state as LocationState;

    // 임시 데이터 (실제로는 API에서 받아올 데이터)
    const selectedRegions: RegionData[] = [
        { name: '역삼동', district: '강남구', score: 95, commuteTime: 25, facilities: { subway: 2, bus: 5, cafe: 8 } },
        { name: '논현동', district: '강남구', score: 92, commuteTime: 30, facilities: { subway: 1, bus: 4, cafe: 6 } },
        { name: '삼성동', district: '강남구', score: 90, commuteTime: 28, facilities: { subway: 2, bus: 3, cafe: 7 } },
        { name: '청담동', district: '강남구', score: 88, commuteTime: 35, facilities: { subway: 1, bus: 4, cafe: 5 } },
        { name: '도곡동', district: '강남구', score: 85, commuteTime: 32, facilities: { subway: 1, bus: 3, cafe: 4 } },
    ];

    const recommendedRegions: RegionData[] = [
        { name: '서초동', district: '서초구', score: 93, commuteTime: 28, facilities: { subway: 2, bus: 4, cafe: 7 } },
        { name: '반포동', district: '서초구', score: 91, commuteTime: 30, facilities: { subway: 1, bus: 5, cafe: 6 } },
        { name: '방배동', district: '서초구', score: 89, commuteTime: 32, facilities: { subway: 1, bus: 3, cafe: 5 } },
        { name: '잠원동', district: '서초구', score: 87, commuteTime: 35, facilities: { subway: 1, bus: 4, cafe: 4 } },
        { name: '내곡동', district: '서초구', score: 85, commuteTime: 38, facilities: { subway: 1, bus: 3, cafe: 3 } },
    ];

    const handleRegionSelect = (region: RegionData) => {
        navigate('/result', { state: { ...preferenceData, selectedRegion: region } });
    };

    const RegionCard = ({ region, isSelected, rank }: { region: RegionData; isSelected: boolean; rank: number }) => (
        <Card
            sx={{
                width: '100%',
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                },
                border: isSelected ? '2px solid #007AFF' : 'none',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                p: 2,
                gap: 3,
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '4px',
                    background: rank <= 3 
                        ? rank === 1 ? '#FFD700' 
                        : rank === 2 ? '#C0C0C0' 
                        : '#CD7F32'
                        : '#007AFF',
                }
            }}
            onClick={() => handleRegionSelect(region)}
        >
            <Box sx={{ 
                width: '60px', 
                height: '60px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                borderRadius: '50%',
                backgroundColor: rank <= 3 
                    ? rank === 1 ? 'rgba(255, 215, 0, 0.1)' 
                    : rank === 2 ? 'rgba(192, 192, 192, 0.1)' 
                    : 'rgba(205, 127, 51, 0.1)'
                    : 'rgba(0, 122, 255, 0.1)',
                color: rank <= 3 
                    ? rank === 1 ? '#FFD700' 
                    : rank === 2 ? '#C0C0C0' 
                    : '#CD7F32'
                    : '#007AFF',
                fontWeight: 700,
                fontSize: '1.5rem'
            }}>
                {rank}
            </Box>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {region.name}
                    </Typography>
                    <Chip
                        label={`${region.score}점`}
                        color="primary"
                        sx={{ 
                            backgroundColor: '#007AFF', 
                            color: 'white',
                            fontWeight: 500,
                            '& .MuiChip-label': {
                                px: 1.5,
                            }
                        }}
                    />
                </Box>
                <Typography color="text.secondary" sx={{ fontWeight: 500 }}>
                    {region.district}
                </Typography>
                <Box sx={{ 
                    display: 'flex', 
                    gap: 1, 
                    flexWrap: 'wrap',
                    mt: 1
                }}>
                    <Chip
                        label={`통근 ${region.commuteTime}분`}
                        variant="outlined"
                        size="small"
                        sx={{
                            borderColor: '#007AFF',
                            color: '#007AFF',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 122, 255, 0.1)',
                            }
                        }}
                    />
                    {Object.entries(region.facilities).map(([key, value]) => (
                        <Chip
                            key={key}
                            label={`${key} ${value}개`}
                            variant="outlined"
                            size="small"
                            sx={{
                                borderColor: '#007AFF',
                                color: '#007AFF',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 122, 255, 0.1)',
                                }
                            }}
                        />
                    ))}
                </Box>
            </Box>
        </Card>
    );

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
                    추천 지역 순위
                </Typography>

                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    gap: 3,
                    maxWidth: '800px',
                    mx: 'auto'
                }}>
                    {[...selectedRegions, ...recommendedRegions]
                        .sort((a, b) => b.score - a.score)
                        .slice(0, 10)
                        .map((region, index) => (
                            <RegionCard 
                                key={region.name} 
                                region={region} 
                                isSelected={false}
                                rank={index + 1}
                            />
                        ))}
                </Box>
            </Paper>
        </Container>
    );
};

export default RegionSelection; 