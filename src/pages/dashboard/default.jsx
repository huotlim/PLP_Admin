import { useState } from 'react';

// material-ui
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import MonthlyBarChart from 'sections/dashboard/default/MonthlyBarChart';
import ReportAreaChart from 'sections/dashboard/default/ReportAreaChart';
import UniqueVisitorCard from 'sections/dashboard/default/UniqueVisitorCard';
import SaleReportCard from 'sections/dashboard/default/SaleReportCard';
import OrdersTable from 'sections/dashboard/default/OrdersTable';

// assets
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import GiftOutlined from '@ant-design/icons/GiftOutlined';
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';

import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// Khmer font styles
const khmerFontStyles = {
  fontFamily: '"Noto Sans Khmer", sans-serif',
  fontWeight: 400
};

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  const [orderMenuAnchor, setOrderMenuAnchor] = useState(null);
  const [analyticsMenuAnchor, setAnalyticsMenuAnchor] = useState(null);

  const handleOrderMenuClick = (event) => {
    setOrderMenuAnchor(event.currentTarget);
  };
  const handleOrderMenuClose = () => {
    setOrderMenuAnchor(null);
  };

  const handleAnalyticsMenuClick = (event) => {
    setAnalyticsMenuAnchor(event.currentTarget);
  };
  const handleAnalyticsMenuClose = () => {
    setAnalyticsMenuAnchor(null);
  };

  return (
    <div style={khmerFontStyles}>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {/* row 1 */}
        <Grid sx={{ mb: -2.25 }} size={12}>
          <Typography variant="h5" sx={khmerFontStyles}>ទំព័រគ្រប់គ្រង</Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <AnalyticEcommerce title="ចំនួនសៀវភៅសរុប" count="12,450" percentage={15.2} extra="១,២០០" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <AnalyticEcommerce title="អ្នកប្រើប្រាស់សរុប" count="2,890" percentage={25.8} extra="៣៥០" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <AnalyticEcommerce title="សៀវភៅដែលបានខ្ចី" count="1,240" percentage={8.7} color="warning" extra="១៥០" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <AnalyticEcommerce title="សៀវភៅលើសកំណត់" count="58" percentage={-12.4} isLoss color="error" extra="២៥" />
        </Grid>
        <Grid sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} size={{ md: 8 }} />
        
        {/* row 2 */}
        <Grid size={{ xs: 12, md: 7, lg: 8 }}>
          <UniqueVisitorCard />
        </Grid>
        <Grid size={{ xs: 12, md: 5, lg: 4 }}>
          <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Grid>
              <Typography variant="h5" sx={khmerFontStyles}>ការប្រើប្រាស់បណ្ណាល័យ</Typography>
            </Grid>
            <Grid />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <Box sx={{ p: 3, pb: 0 }}>
              <Stack sx={{ gap: 2 }}>
                <Typography variant="h6" color="text.secondary" sx={khmerFontStyles}>
                  ស្ថិតិសប្តាហ៍នេះ
                </Typography>
                <Typography variant="h3">៧,៦៥០</Typography>
              </Stack>
            </Box>
            <MonthlyBarChart />
          </MainCard>
        </Grid>
        
        {/* row 3 */}
        <Grid size={{ xs: 12, md: 7, lg: 8 }}>
          <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Grid>
              <Typography variant="h5" sx={khmerFontStyles}>ការខ្ចីថ្មីៗ</Typography>
            </Grid>
            <Grid>
              <IconButton onClick={handleOrderMenuClick}>
                <EllipsisOutlined style={{ fontSize: '1.25rem' }} />
              </IconButton>
              <Menu
                id="fade-menu"
                slotProps={{ list: { 'aria-labelledby': 'fade-button' } }}
                anchorEl={orderMenuAnchor}
                onClose={handleOrderMenuClose}
                open={Boolean(orderMenuAnchor)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem onClick={handleOrderMenuClose} sx={khmerFontStyles}>នាំចេញជា CSV</MenuItem>
                <MenuItem onClick={handleOrderMenuClose} sx={khmerFontStyles}>នាំចេញជា Excel</MenuItem>
                <MenuItem onClick={handleOrderMenuClose} sx={khmerFontStyles}>បោះពុម្ពតារាង</MenuItem>
              </Menu>
            </Grid>
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <OrdersTable />
          </MainCard>
        </Grid>
        <Grid size={{ xs: 12, md: 5, lg: 4 }}>
          <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Grid>
              <Typography variant="h5" sx={khmerFontStyles}>របាយការណ៍វិភាគ</Typography>
            </Grid>
            <Grid>
              <IconButton onClick={handleAnalyticsMenuClick}>
                <EllipsisOutlined style={{ fontSize: '1.25rem' }} />
              </IconButton>
              <Menu
                id="fade-menu"
                slotProps={{ list: { 'aria-labelledby': 'fade-button' } }}
                anchorEl={analyticsMenuAnchor}
                open={Boolean(analyticsMenuAnchor)}
                onClose={handleAnalyticsMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem onClick={handleAnalyticsMenuClose} sx={khmerFontStyles}>ប្រចាំសប្តាហ៍</MenuItem>
                <MenuItem onClick={handleAnalyticsMenuClose} sx={khmerFontStyles}>ប្រចាំខែ</MenuItem>
                <MenuItem onClick={handleAnalyticsMenuClose} sx={khmerFontStyles}>ប្រចាំឆ្នាំ</MenuItem>
              </Menu>
            </Grid>
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
              <ListItemButton divider>
                <ListItemText primary={<span style={khmerFontStyles}>ការលូតលាស់ការប្រើប្រាស់</span>} />
                <Typography variant="h5">+៤៥.១៤%</Typography>
              </ListItemButton>
              <ListItemButton divider>
                <ListItemText primary={<span style={khmerFontStyles}>អត្រាសៀវភៅខូច</span>} />
                <Typography variant="h5">០.៥៨%</Typography>
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary={<span style={khmerFontStyles}>កំណត់ហេតុគ្រោះថ្នាក់</span>} />
                <Typography variant="h5" sx={khmerFontStyles}>ទាប</Typography>
              </ListItemButton>
            </List>
            <ReportAreaChart />
          </MainCard>
        </Grid>
        
        {/* row 4 */}
        <Grid size={{ xs: 12, md: 7, lg: 8 }}>
          <SaleReportCard />
        </Grid>
        <Grid size={{ xs: 12, md: 5, lg: 4 }}>
          <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Grid>
              <Typography variant="h5" sx={khmerFontStyles}>ប្រវត្តិប្រតិបត្តិការ</Typography>
            </Grid>
            <Grid />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <List
              component="nav"
              sx={{
                px: 0,
                py: 0,
                '& .MuiListItemButton-root': {
                  py: 1.5,
                  px: 2,
                  '& .MuiAvatar-root': avatarSX,
                  '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                }
              }}
            >
              <ListItem
                component={ListItemButton}
                divider
                secondaryAction={
                  <Stack sx={{ alignItems: 'flex-end' }}>
                    <Typography variant="subtitle1" noWrap sx={khmerFontStyles}>
                      បានខ្ចី
                    </Typography>
                    <Typography variant="h6" color="secondary" noWrap>
                      ៧៨%
                    </Typography>
                  </Stack>
                }
              >
                <ListItemAvatar>
                  <Avatar sx={{ color: 'success.main', bgcolor: 'success.lighter' }}>
                    <GiftOutlined />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={<Typography variant="subtitle1" sx={khmerFontStyles}>សៀវភៅ #០០២៤៣434</Typography>} 
                  secondary="ថ្ងៃនេះ, ២:០០ AM" 
                />
              </ListItem>
              <ListItem
                component={ListItemButton}
                divider
                secondaryAction={
                  <Stack sx={{ alignItems: 'flex-end' }}>
                    <Typography variant="subtitle1" noWrap sx={khmerFontStyles}>
                      ត្រលប់
                    </Typography>
                    <Typography variant="h6" color="secondary" noWrap>
                      ៨%
                    </Typography>
                  </Stack>
                }
              >
                <ListItemAvatar>
                  <Avatar sx={{ color: 'primary.main', bgcolor: 'primary.lighter' }}>
                    <MessageOutlined />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={<Typography variant="subtitle1" sx={khmerFontStyles}>សៀវភៅ #៩៨៤៩៤៧</Typography>} 
                  secondary="៥ សីហា, ១:៤៥ PM" 
                />
              </ListItem>
              <ListItem
                component={ListItemButton}
                secondaryAction={
                  <Stack sx={{ alignItems: 'flex-end' }}>
                    <Typography variant="subtitle1" noWrap sx={khmerFontStyles}>
                      លើសកំណត់
                    </Typography>
                    <Typography variant="h6" color="secondary" noWrap>
                      ១៦%
                    </Typography>
                  </Stack>
                }
              >
                <ListItemAvatar>
                  <Avatar sx={{ color: 'error.main', bgcolor: 'error.lighter' }}>
                    <SettingOutlined />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={<Typography variant="subtitle1" sx={khmerFontStyles}>សៀវភៅ #៩៨៨៧៨៤</Typography>} 
                  secondary="៧ ម៉ោងមុន" 
                />
              </ListItem>
            </List>
          </MainCard>
          <MainCard sx={{ mt: 2 }}>
            <Stack sx={{ gap: 3 }}>
              <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Grid>
                  <Stack>
                    <Typography variant="h5" noWrap sx={khmerFontStyles}>
                      ជំនួយ & ការគាំទ្រ
                    </Typography>
                    <Typography variant="caption" color="secondary" noWrap sx={khmerFontStyles}>
                      ការឆ្លើយតបក្នុងរយៈពេល ៥ នាទី
                    </Typography>
                  </Stack>
                </Grid>
                <Grid>
                  <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                    <Avatar alt="អ្នកគាំទ្រ ១" src={avatar1} />
                    <Avatar alt="អ្នកគាំទ្រ ២" src={avatar2} />
                    <Avatar alt="អ្នកគាំទ្រ ៣" src={avatar3} />
                    <Avatar alt="អ្នកគាំទ្រ ៤" src={avatar4} />
                  </AvatarGroup>
                </Grid>
              </Grid>
              <Button size="small" variant="contained" sx={{ textTransform: 'capitalize', ...khmerFontStyles }}>
                ត្រូវការជំនួយ?
              </Button>
            </Stack>
          </MainCard>
        </Grid>
      </Grid>
    </div>
  );
}
