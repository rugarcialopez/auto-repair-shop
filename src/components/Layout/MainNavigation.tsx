import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Auto shop repair</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to='/login' activeClassName={classes.active}>Login</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation;