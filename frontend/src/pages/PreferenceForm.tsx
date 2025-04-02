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
  Chip,
  Stack,
} from '@mui/material';

const steps = ['주거 형태', '예산', '주변 환경', '교통'];

const PreferenceForm = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    residenceType: '',
    deposit: '',
    monthlyRent: '',
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
  });

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
    navigate('/result', { state: formData });
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
              어떤 형태의 주거를 선호하시나요?
            </Typography>
            <RadioGroup
              value={formData.residenceType}
              onChange={handleResidenceTypeChange}
              sx={{
                '& .MuiFormControlLabel-root': {
                  margin: '16px 0',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  backgroundColor: formData.residenceType ? 'rgba(0, 122, 255, 0.1)' : 'transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 122, 255, 0.05)',
                  },
                },
                '& .MuiRadio-root': {
                  color: '#007AFF',
                  '&.Mui-checked': {
                    color: '#007AFF',
                  },
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
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
              예산을 설정해주세요
            </Typography>
            <TextField
              fullWidth
              label="보증금 (만원)"
              type="number"
              value={formData.deposit}
              onChange={(e) => setFormData({ ...formData, deposit: e.target.value })}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&:hover fieldset': {
                    borderColor: '#007AFF',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#666',
                },
              }}
            />
            <TextField
              fullWidth
              label="월세 (만원)"
              type="number"
              value={formData.monthlyRent}
              onChange={(e) => setFormData({ ...formData, monthlyRent: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&:hover fieldset': {
                    borderColor: '#007AFF',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#666',
                },
              }}
            />
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
              선호하는 주변 환경을 선택해주세요
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {Object.entries(formData.facilities).map(([facility, checked]) => (
                <Chip
                  key={facility}
                  label={facility}
                  onClick={() => handleFacilityChange(facility)}
                  sx={{
                    backgroundColor: checked ? '#007AFF' : 'rgba(0, 0, 0, 0.05)',
                    color: checked ? 'white' : '#333',
                    '&:hover': {
                      backgroundColor: checked ? '#0056b3' : 'rgba(0, 0, 0, 0.1)',
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
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
              통근 시간과 직장 위치를 설정해주세요
            </Typography>
            <Box sx={{ mb: 4 }}>
              <Typography gutterBottom sx={{ color: '#666' }}>
                최대 통근 시간: {formData.maxCommuteTime}분
              </Typography>
              <Slider
                value={formData.maxCommuteTime}
                onChange={(_, value) => setFormData({ ...formData, maxCommuteTime: value as number })}
                min={0}
                max={120}
                step={5}
                marks
                sx={{
                  color: '#007AFF',
                  '& .MuiSlider-thumb': {
                    backgroundColor: '#fff',
                    border: '2px solid #007AFF',
                    '&:hover, &.Mui-focusVisible': {
                      boxShadow: '0 0 0 8px rgba(0, 122, 255, 0.16)',
                    },
                  },
                }}
              />
            </Box>
            <TextField
              fullWidth
              label="직장 위치"
              value={formData.workplaceLocation}
              onChange={(e) => setFormData({ ...formData, workplaceLocation: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&:hover fieldset': {
                    borderColor: '#007AFF',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#666',
                },
              }}
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
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          {activeStep !== 0 && (
            <Button 
              onClick={handleBack} 
              sx={{ 
                mr: 2,
                color: '#666',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                },
              }}
            >
              이전
            </Button>
          )}
          {activeStep === steps.length - 1 ? (
            <Button 
              variant="contained" 
              onClick={handleSearch}
              sx={{
                backgroundColor: '#007AFF',
                borderRadius: '12px',
                padding: '10px 24px',
                '&:hover': {
                  backgroundColor: '#0056b3',
                },
              }}
            >
              검색하기
            </Button>
          ) : (
            <Button 
              variant="contained" 
              onClick={handleNext}
              sx={{
                backgroundColor: '#007AFF',
                borderRadius: '12px',
                padding: '10px 24px',
                '&:hover': {
                  backgroundColor: '#0056b3',
                },
              }}
            >
              다음
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default PreferenceForm; 