import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    Button,
    Box,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    Slider,
    Chip,
    Checkbox,
    FormGroup,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Tabs,
    Tab,
} from '@mui/material';

const steps = ['이사 목적', '선호 지역', '주변 시설', '예산 설정', '교통 조건'];

const stepBoxStyle = {
    mt: 4,
    minHeight: '450px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    p: 4,
    borderRadius: '16px',
    background: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
};

const PreferenceForm = () => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        purpose: '',
        preferredDistricts: [] as string[],
        facilities: {
        mart: false,
        hospital: false,
        park: false,
        school: false,
        cafe: false,
        restaurant: false,
        convenience: false,
        },
        residenceType: '',
        deposit: '',
        monthlyRent: '',
        transportation: [] as string[],
        maxCommuteTime: 30,
        workplaceLocation: '',
    });

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleSearch = () => {
        navigate('/result', { state: formData });
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveStep(newValue);
    };

    const getStepContent = (step: number) => {
        switch (step) {
        case 0:
            return (
            <Box sx={stepBoxStyle}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
                이사 목적을 선택해주세요
                </Typography>
                <RadioGroup
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                sx={{
                    '& .MuiFormControlLabel-root': {
                    margin: '16px 0',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    backgroundColor: formData.purpose ? 'rgba(0, 122, 255, 0.1)' : 'transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 122, 255, 0.05)',
                    },
                    },
                }}
                >
                <FormControlLabel value="work" control={<Radio />} label="취업" />
                <FormControlLabel value="education" control={<Radio />} label="교육" />
                <FormControlLabel value="culture" control={<Radio />} label="문화생활" />
                <FormControlLabel value="convenience" control={<Radio />} label="생활 편의" />
                </RadioGroup>
            </Box>
            );
        case 1:
            return (
            <Box sx={stepBoxStyle}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
                선호하는 지역을 선택해주세요
                </Typography>
                <FormControl fullWidth>
                <InputLabel>선호 지역</InputLabel>
                <Select
                    multiple
                    value={formData.preferredDistricts}
                    onChange={(e) => setFormData({ ...formData, preferredDistricts: e.target.value as string[] })}
                    renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                        <Chip key={value} label={value} />
                        ))}
                    </Box>
                    )}
                >
                    {['강남구', '서초구', '송파구', '강동구', '마포구', '종로구', '용산구'].map((district) => (
                    <MenuItem key={district} value={district}>
                        <Checkbox checked={formData.preferredDistricts.indexOf(district) > -1} />
                        {district}
                    </MenuItem>
                    ))}
                </Select>
                </FormControl>
            </Box>
            );
        case 2:
            return (
            <Box sx={stepBoxStyle}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
                선호하는 주변 시설을 선택해주세요
                </Typography>
                <FormGroup>
                {Object.entries(formData.facilities).map(([facility, checked]) => (
                    <FormControlLabel
                    key={facility}
                    control={
                        <Checkbox
                        checked={checked}
                        onChange={(e) =>
                            setFormData({
                            ...formData,
                            facilities: { ...formData.facilities, [facility]: e.target.checked },
                            })
                        }
                        />
                    }
                    label={facility}
                    />
                ))}
                </FormGroup>
            </Box>
            );
        case 3:
            return (
            <Box sx={stepBoxStyle}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
                예산을 설정해주세요
                </Typography>
                <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>거래 유형</InputLabel>
                <Select
                    value={formData.residenceType}
                    onChange={(e) => setFormData({ ...formData, residenceType: e.target.value })}
                >
                    <MenuItem value="monthly">월세</MenuItem>
                    <MenuItem value="jeonse">전세</MenuItem>
                    <MenuItem value="purchase">매매</MenuItem>
                </Select>
                </FormControl>
                <TextField
                fullWidth
                label="보증금/전세금 (만원)"
                type="number"
                value={formData.deposit}
                onChange={(e) => setFormData({ ...formData, deposit: e.target.value })}
                sx={{ mb: 3 }}
                />
                <TextField
                fullWidth
                label="월세 (만원)"
                type="number"
                value={formData.monthlyRent}
                onChange={(e) => setFormData({ ...formData, monthlyRent: e.target.value })}
                />
            </Box>
            );
        case 4:
            return (
            <Box sx={stepBoxStyle}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
                교통 조건을 설정해주세요
                </Typography>
                <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>주로 이용하는 교통 수단</InputLabel>
                <Select
                    multiple
                    value={formData.transportation}
                    onChange={(e) => setFormData({ ...formData, transportation: e.target.value as string[] })}
                    renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                        <Chip key={value} label={value} />
                        ))}
                    </Box>
                    )}
                >
                    {['지하철', '버스', '자가용', '자전거', '도보'].map((transport) => (
                    <MenuItem key={transport} value={transport}>
                        <Checkbox checked={formData.transportation.indexOf(transport) > -1} />
                        {transport}
                    </MenuItem>
                    ))}
                </Select>
                </FormControl>
                <Box sx={{ mb: 3 }}>
                <Typography gutterBottom>최대 통근 시간: {formData.maxCommuteTime}분</Typography>
                <Slider
                    value={formData.maxCommuteTime}
                    onChange={(_, value) => setFormData({ ...formData, maxCommuteTime: value as number })}
                    min={0}
                    max={120}
                    step={5}
                    marks
                />
                </Box>
                <TextField
                fullWidth
                label="직장 위치"
                value={formData.workplaceLocation}
                onChange={(e) => setFormData({ ...formData, workplaceLocation: e.target.value })}
                />
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
            선호도 입력
            </Typography>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
            <Tabs
                value={activeStep}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                '& .MuiTabs-indicator': {
                    background: 'linear-gradient(90deg, #007AFF 0%, #FF2D55 100%)',
                },
                '& .MuiTab-root': {
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 500,
                    minWidth: '120px',
                    '&.Mui-selected': {
                    color: '#007AFF',
                    },
                },
                }}
            >
                {steps.map((label, index) => (
                <Tab
                    key={label}
                    label={label}
                    disabled={index > 0 && !formData.purpose && index !== 1}
                />
                ))}
            </Tabs>
            </Box>

            {getStepContent(activeStep)}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{
                borderRadius: '12px',
                px: 3,
                py: 1,
                }}
            >
                이전
            </Button>
            <Button
                variant="contained"
                onClick={activeStep === steps.length - 1 ? handleSearch : handleNext}
                sx={{
                borderRadius: '12px',
                px: 3,
                py: 1,
                background: 'linear-gradient(90deg, #007AFF 0%, #FF2D55 100%)',
                '&:hover': {
                    background: 'linear-gradient(90deg, #0066CC 0%, #CC2244 100%)',
                },
                }}
            >
                {activeStep === steps.length - 1 ? '결과 보기' : '다음'}
            </Button>
            </Box>
        </Paper>
        </Container>
    );
};

export default PreferenceForm; 