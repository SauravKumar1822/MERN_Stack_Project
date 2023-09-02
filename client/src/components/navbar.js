import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const [cookies, setCookie] = useCookies(['access_token']);
    const navigate = useNavigate();
    const logout = () => {
        setCookie('access_token', '');
        window.localStorage.removeItem('userId');
        navigate('/auth');
    };

    return (
        <div className="navbar">
            <Link to="/"> Home</Link>
            <Link to="/create-recipe"> Create Recipe</Link>

            {!cookies.access_token ? (
                <Link to="/auth"> Login/Register</Link>
            )
                :
                (
                    <>
                        <Link to="/saved-recipe"> Saved Recipes</Link>
                        <button style={{ cursor: 'pointer' }} onClick={logout}>Logout</button>
                    </>
                )
            }

        </div>
    );
}