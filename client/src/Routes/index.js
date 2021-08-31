import Login from '../Pages/Login';
import Signup from '../Pages/Signup';

const Routes = [
    {
        path: "/login",
        component: <Login />,
        title: "Login Page"
    },
    {
        path: "/signup",
        component: <Signup />,
        title: "Signup Page"
    }
];


export default  Routes;