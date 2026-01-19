// material-ui
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';

// ==============================|| LOGO TEXT ||============================== //

export default function LogoMain() {
  const theme = useTheme();
  
  return (
    <Typography 
      variant="h4" 
      sx={{ 
        color: theme.palette.primary.main,
        fontWeight: 'bold',
        fontSize: '28px',
        fontFamily: '"Noto Sans Khmer", sans-serif',
        fontVariationSettings: '"wdth" 79.4'
      }}
    >
      បណ្ណាល័យ PLP
    </Typography>
  );
}
