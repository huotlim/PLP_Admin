// material-ui
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';

// ==============================|| LOGO ICON TEXT ||============================== //

export default function LogoIcon() {
  const theme = useTheme();

  return (
    <Typography
      variant="h4"
      sx={{
        color: theme.palette.primary.main,
        fontWeight: 'bold',
        fontSize: '24px',
        fontFamily: '"Noto Sans Khmer", sans-serif',
        fontVariationSettings: '"wdth" 79.4'
      }}
    >
      PLP
    </Typography>
  );
}
