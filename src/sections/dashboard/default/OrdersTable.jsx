import PropTypes from 'prop-types';
// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third-party
import { NumericFormat } from 'react-number-format';

// project imports
import Dot from 'components/@extended/Dot';

// Khmer font styles
const khmerFontStyles = {
  fontFamily: '"Noto Sans Khmer", sans-serif',
  fontWeight: 400
};

function createData(tracking_no, name, fat, carbs, protein) {
  return { tracking_no, name, fat, carbs, protein };
}

const rows = [
  createData('BRW001', 'ប្រលោមលោក អាមេរិកាំង', 'ចន តេវ', 1, '2024-01-15'),
  createData('BRW002', 'វិទ្យាសាស្ត្រ និងពេលវេលា', 'សុភា គីម', 0, '2024-01-14'),
  createData('BRW003', 'ការណែនាំ Algorithms', 'វណ្ណា លី', 2, '2024-01-13'),
  createData('BRW004', 'ប្រវត្តិសាស្ត្រខ្មែរ', 'សុខា ភ័ណ', 1, '2024-01-12'),
  createData('BRW005', 'កូដស្អាត', 'រតនា ហេង', 0, '2024-01-11'),
  createData('BRW006', 'គណិតវិទ្យាឧត្តម', 'ធារា ស៊ុន', 2, '2024-01-10'),
  createData('BRW007', 'រូបវិទ្យាទំនើប', 'សំណាង ឡុង', 1, '2024-01-09'),
  createData('BRW008', 'អក្សរសាស្ត្រខ្មែរ', 'ស្រីពេច យឹម', 0, '2024-01-08'),
  createData('BRW009', 'បច្ចេកវិទ្យាព័ត៌មាន', 'បុរី ជា', 1, '2024-01-07'),
  createData('BRW010', 'ការគ្រប់គ្រងគម្រោង', 'សុភី តាន់', 0, '2024-01-06')
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'tracking_no',
    align: 'left',
    disablePadding: false,
    label: 'លេខកូដ'
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'ចំណងជើងសៀវភៅ'
  },
  {
    id: 'fat',
    align: 'left',
    disablePadding: false,
    label: 'អ្នកខ្ចី'
  },
  {
    id: 'carbs',
    align: 'left',
    disablePadding: false,
    label: 'ស្ថានភាព'
  },
  {
    id: 'protein',
    align: 'right',
    disablePadding: false,
    label: 'ថ្ងៃខ្ចី'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={khmerFontStyles}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function OrderStatus({ status }) {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'success';
      title = 'បានខ្ចី';
      break;
    case 1:
      color = 'primary';
      title = 'បានត្រលប់';
      break;
    case 2:
      color = 'error';
      title = 'លើសកំណត់';
      break;
    default:
      color = 'warning';
      title = 'រងចាំ';
  }

  return (
    <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
      <Dot color={color} />
      <Typography sx={khmerFontStyles}>{title}</Typography>
    </Stack>
  );
}

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable() {
  const order = 'asc';
  const orderBy = 'tracking_no';

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table aria-labelledby="tableTitle">
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  key={row.tracking_no}
                >
                  <TableCell component="th" id={labelId} scope="row">
                    <Link color="secondary">{row.tracking_no}</Link>
                  </TableCell>
                  <TableCell sx={khmerFontStyles}>{row.name}</TableCell>
                  <TableCell sx={khmerFontStyles}>{row.fat}</TableCell>
                  <TableCell>
                    <OrderStatus status={row.carbs} />
                  </TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

OrderTableHead.propTypes = { order: PropTypes.any, orderBy: PropTypes.string };

OrderStatus.propTypes = { status: PropTypes.number };
