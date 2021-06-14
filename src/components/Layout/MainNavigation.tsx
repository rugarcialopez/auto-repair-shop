import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const authContext = useContext(AuthContext);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Auto shop repair</div>
      <nav className={classes.nav}>
        <ul>
          {!authContext.isLoggedIn && <li>
            <NavLink to='/login' activeClassName={classes.active}>Login</NavLink>
          </li>}
          {authContext.isLoggedIn && <li>
            <NavLink to='/repairs' activeClassName={classes.active}>Repairs</NavLink>
          </li>}
          {authContext.isLoggedIn && authContext.role === 'manager' && <li>
            <NavLink to='/users' activeClassName={classes.active}>Users</NavLink>
          </li>}
          {authContext.isLoggedIn && <li>
            <NavLink to='/' activeClassName={classes.active} onClick={authContext.logout} exact>Logout</NavLink>
          </li>}
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation;