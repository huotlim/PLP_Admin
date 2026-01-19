// material-ui
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';

// assets
import avatar from 'assets/images/users/avatar-group.png';
import AnimateButton from 'components/@extended/AnimateButton';

// ==============================|| DRAWER CONTENT - NAVIGATION CARD ||============================== //

export default function NavCard() {
  return (
    <p 
      style={{ 
        textAlign: 'right',
        fontFamily: '"Noto Sans Khmer", sans-serif',
        fontVariationSettings: '"wdth" 79.4'
      }}
    >
      កំណែ v.0.0.1
    </p>
  );
}
