import { Box, FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SEOUL_DISTRICTS = [
  '강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구',
  '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구',
  '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'
];

const BUILDING_TYPES = [
  '아파트', '오피스텔', '빌라', '단독주택'
];

const SearchForm = () => {
  const navigate = useNavigate();
  const [district, setDistrict] = useState('');
  const [buildingType, setBuildingType] = useState('');

  const handleDistrictChange = (event: SelectChangeEvent) => {
    setDistrict(event.target.value);
  };

  const handleBuildingTypeChange = (event: SelectChangeEvent) => {
    setBuildingType(event.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        maxWidth: '400px',
        width: '100%',
        padding: '2rem',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      }}
    >
      <FormControl fullWidth>
        <InputLabel>지역 선택</InputLabel>
        <Select
          value={district}
          label="지역 선택"
          onChange={handleDistrictChange}
          sx={{
            borderRadius: '10px',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          {SEOUL_DISTRICTS.map((district) => (
            <MenuItem key={district} value={district}>
              {district}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>건물 유형</InputLabel>
        <Select
          value={buildingType}
          label="건물 유형"
          onChange={handleBuildingTypeChange}
          sx={{
            borderRadius: '10px',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          {BUILDING_TYPES.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        onClick={() => navigate('/preference')}
        sx={{
          mt: 2,
          py: 1.5,
          background: '#1d1d1f',
          borderRadius: '10px',
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 500,
          '&:hover': {
            background: '#000000',
          },
        }}
      >
        나에게 맞는 지역 찾기
      </Button>
    </Box>
  );
};

export default SearchForm; 