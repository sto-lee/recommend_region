import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    Stepper,
    Step,
    StepLabel,
    Button,
    Box,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    Slider,
    Stack,
    Chip,
} from '@mui/material';

interface FormData {
    residenceType: string;
    minBudget: string;
    maxBudget: string;
    preferredDistricts: string[];
    maxCommuteTime: number;
    facilities: {
        subway: boolean;
        bus: boolean;
        shopping: boolean;
        hospital: boolean;
        park: boolean;
        cafe: boolean;
        restaurant: boolean;
    };
    workplaceLocation: string;
}

const initialFormData: FormData = {
    residenceType: '',
    minBudget: '',
    maxBudget: '',
    preferredDistricts: [],
    maxCommuteTime: 30,
    facilities: {
        subway: false,
        bus: false,
        shopping: false,
        hospital: false,
        park: false,
        cafe: false,
        restaurant: false,
    },
    workplaceLocation: '',
};

const steps = ['주거 형태', '예산', '주변 환경', '교통'];

const PreferenceForm = () => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState(initialFormData);

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleResidenceTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, residenceType: event.target.value });
    };

    const handleFacilityChange = (facility: string) => {
        setFormData({
            ...formData,
            facilities: {
                ...formData.facilities,
                [facility]: !formData.facilities[facility as keyof typeof formData.facilities],
            },
        });
    };

    const handleSearch = () => {
        // 선택한 데이터를 state로 전달
        navigate('/region-selection', { state: { preferenceData: formData } });
    };

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <Box sx={{ height: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="h6" gutterBottom align="center" sx={{ mb: 4, fontWeight: 600, color: '#1d1d1f' }}>
                            선호하시는 주거 형태를 선택해주세요
                        </Typography>
                        <RadioGroup
                            value={formData.residenceType}
                            onChange={handleResidenceTypeChange}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px',
                                justifyContent: 'center',
                                height: '250px',
                                '& .MuiFormControlLabel-root': {
                                    margin: 0,
                                    padding: '12px 24px',
                                    borderRadius: '12px',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 122, 255, 0.05)',
                                    },
                                    '&.Mui-checked': {
                                        backgroundColor: 'rgba(0, 122, 255, 0.1)',
                                    },
                                },
                                '& .MuiRadio-root': {
                                    color: '#999',
                                    '&.Mui-checked': {
                                        color: '#007AFF',
                                    },
                                },
                                '& .MuiTypography-root': {
                                    fontSize: '1.1rem',
                                    fontWeight: 500,
                                },
                            }}
                        >
                            <FormControlLabel value="monthly" control={<Radio />} label="월세" />
                            <FormControlLabel value="jeonse" control={<Radio />} label="전세" />
                            <FormControlLabel value="purchase" control={<Radio />} label="매매" />
                        </RadioGroup>
                    </Box>
                );
            case 1:
                return (
                    <Box sx={{ height: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="h6" gutterBottom align="center" sx={{ mb: 4, fontWeight: 600, color: '#1d1d1f' }}>
                            예산 범위를 설정해주세요
                        </Typography>
                        <Box sx={{ px: 4 }}>
                            <TextField
                                fullWidth
                                label="최소 예산"
                                type="number"
                                name="minBudget"
                                value={formData.minBudget}
                                onChange={(e) => setFormData({ ...formData, minBudget: e.target.value })}
                                sx={{
                                    mb: 3,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                        '&:hover fieldset': {
                                            borderColor: '#007AFF',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#007AFF',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#999',
                                        '&.Mui-focused': {
                                            color: '#007AFF',
                                        },
                                    },
                                }}
                            />
                            <TextField
                                fullWidth
                                label="최대 예산"
                                type="number"
                                name="maxBudget"
                                value={formData.maxBudget}
                                onChange={(e) => setFormData({ ...formData, maxBudget: e.target.value })}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                        '&:hover fieldset': {
                                            borderColor: '#007AFF',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#007AFF',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#999',
                                        '&.Mui-focused': {
                                            color: '#007AFF',
                                        },
                                    },
                                }}
                            />
                        </Box>
                    </Box>
                );
            case 2:
                return (
                    <Box sx={{ height: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="h6" gutterBottom align="center" sx={{ mb: 4, fontWeight: 600, color: '#1d1d1f' }}>
                            선호하시는 주변 시설을 선택해주세요
                        </Typography>
                        <Stack 
                            direction="row" 
                            spacing={1} 
                            flexWrap="wrap" 
                            gap={1}
                            sx={{
                                justifyContent: 'center',
                                maxWidth: '500px',
                                mx: 'auto',
                                px: 2
                            }}
                        >
                            {Object.entries(formData.facilities).map(([key, value]) => (
                                <Chip
                                    key={key}
                                    label={key === 'subway' ? '지하철' :
                                        key === 'bus' ? '버스정류장' :
                                        key === 'shopping' ? '상업시설' :
                                        key === 'hospital' ? '병원' :
                                        key === 'park' ? '공원' :
                                        key === 'cafe' ? '카페' :
                                        key === 'restaurant' ? '음식점' : key}
                                    onClick={() => handleFacilityChange(key)}
                                    sx={{
                                        backgroundColor: value ? '#007AFF' : 'rgba(0, 0, 0, 0.05)',
                                        color: value ? 'white' : '#333',
                                        '&:hover': {
                                            backgroundColor: value ? '#0056b3' : 'rgba(0, 0, 0, 0.1)',
                                        },
                                        borderRadius: '20px',
                                        padding: '8px 16px',
                                        fontSize: '0.9rem',
                                    }}
                                />
                            ))}
                        </Stack>
                    </Box>
                );
            case 3:
                return (
                    <Box sx={{ height: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="h6" gutterBottom align="center" sx={{ mb: 4, fontWeight: 600, color: '#1d1d1f' }}>
                            통근 시간을 설정해주세요
                        </Typography>
                        <Box sx={{ px: 4 }}>
                            <Typography gutterBottom sx={{ 
                                textAlign: 'center',
                                fontSize: '1.5rem',
                                fontWeight: 600,
                                color: '#007AFF',
                                mb: 4
                            }}>
                                {formData.maxCommuteTime}분
                            </Typography>
                            <Slider
                                value={formData.maxCommuteTime}
                                onChange={(_, value) => setFormData({ ...formData, maxCommuteTime: value as number })}
                                min={10}
                                max={120}
                                step={5}
                                marks
                                sx={{
                                    color: '#007AFF',
                                    '& .MuiSlider-thumb': {
                                        width: 24,
                                        height: 24,
                                        backgroundColor: '#fff',
                                        border: '2px solid #007AFF',
                                        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                                            boxShadow: '0 0 0 4px rgba(0, 122, 255, 0.2)',
                                        },
                                        '&:before': {
                                            display: 'none',
                                        },
                                    },
                                    '& .MuiSlider-track': {
                                        height: 8,
                                        borderRadius: 4,
                                    },
                                    '& .MuiSlider-rail': {
                                        height: 8,
                                        borderRadius: 4,
                                        backgroundColor: '#e0e0e0',
                                    },
                                    '& .MuiSlider-mark': {
                                        backgroundColor: '#fff',
                                        '&.MuiSlider-markActive': {
                                            backgroundColor: '#fff',
                                        },
                                    },
                                    '& .MuiSlider-markLabel': {
                                        fontSize: '0.875rem',
                                        color: '#999',
                                    },
                                }}
                            />
                        </Box>
                    </Box>
                );
            default:
                return '알 수 없는 단계';
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
            <Paper 
                elevation={0}
                sx={{ 
                    p: 4,
                    borderRadius: '16px',
                    background: '#fff',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                }}
            >
                <Typography 
                    variant="h4" 
                    gutterBottom 
                    align="center"
                    sx={{ 
                        fontWeight: 600,
                        mb: 4,
                        color: '#333',
                    }}
                >
                    나에게 맞는 지역 찾기
                </Typography>
                <Stepper 
                    activeStep={activeStep} 
                    sx={{ 
                        mb: 6,
                        '& .MuiStepLabel-label': {
                            color: '#666',
                            '&.Mui-active': {
                                color: '#007AFF',
                            },
                            '&.Mui-completed': {
                                color: '#007AFF',
                            },
                        },
                        '& .MuiStepIcon-root': {
                            color: '#ddd',
                            '&.Mui-active': {
                                color: '#007AFF',
                            },
                            '&.Mui-completed': {
                                color: '#007AFF',
                            },
                        },
                    }}
                >
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {getStepContent(activeStep)}
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    mt: 4,
                    position: 'relative',
                    height: '48px'
                }}>
                    {activeStep !== 0 && (
                        <Button
                            onClick={handleBack}
                            sx={{ 
                                mr: 2,
                                color: '#666',
                                position: 'absolute',
                                right: '120px',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                },
                            }}
                        >
                            뒤로
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        onClick={activeStep === steps.length - 1 ? handleSearch : handleNext}
                        sx={{
                            backgroundColor: '#007AFF',
                            borderRadius: '8px',
                            padding: '8px 24px',
                            position: 'absolute',
                            right: 0,
                            '&:hover': {
                                backgroundColor: '#0056b3',
                            },
                        }}
                    >
                        {activeStep === steps.length - 1 ? '검색하기' : '다음'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default PreferenceForm; 