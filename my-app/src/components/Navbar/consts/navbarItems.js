import FaceIcon from '@mui/icons-material/Face';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import Diversity3RoundedIcon from '@mui/icons-material/Diversity3Rounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

export const mainNavbarItems = [
    {
        id: 0,
        icon: <FaceIcon />,
        label: 'Login',
        route: 'login',
    },
    {
        id: 1,
        icon: <PersonAddAlt1Icon />,
        label: 'Register',
        route: 'register',
    },
    {
        id: 2,
        icon: <CalendarMonthRoundedIcon />,
        label: 'Calendar',
        route: 'calendar',
    },
    {
        id: 3,
        icon: <NewspaperRoundedIcon />,
        label: 'Newsletter',
        route: 'newsletter',
    },
    {
        id: 4,
        icon: <ChatRoundedIcon />,
        label: 'Chat',
        route: 'chat',
    },
    // {
    //     id: 5,
    //     icon: <Diversity3RoundedIcon />,
    //     label: 'Friends',
    //     route: 'friends',
    // },
    {
        id: 6,
        icon: <InfoRoundedIcon />,
        label: 'Info',
        route: 'info',
    },
]