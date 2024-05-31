import React, { useContext, useState } from 'react'
import Link from 'next/link';
import { userContext } from '../context';
import { useRouter } from 'next/router';
import { MdAccountCircle } from "react-icons/md";
const Nav = () => {
 
  const [state, setState] = useContext(userContext)
  //console.log("6", state)
  const router = useRouter()
  const logoutHandler=()=> {
    //remove from local storage
    localStorage.removeItem("auth")
    // clear context
    setState({
      user: {},
      token: "",
    });
    router.push('/login')
  }
  return (
    <ul className="nav bg-dark w-100 d-flex justify-content-end">

      {/* <Link className="nav-link text-light" aria-current="page" href="/">Home</Link>
      <div className="dropdown">
        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          {state?.user?.name}
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
          <Link className="nav-link text-dark dropdown-item" href="/dashboard" style={{ marginLeft: 0 }}>
            DashBoard
          </Link>
          </li>
          <li><a className="dropdown-item" href="#">Another action</a></li>
          <a className="nav-link text-dark dropdown-item" onClick={logoutHandler} style={{ cursor: "pointer" }}>Logout</a>
        </ul>
      </div> */}

      {
        state == null ? (<>
          <Link className="nav-link text-light" href="/register">Register</Link>
          <Link className="nav-link text-light" href="/login">Login</Link>
        </>) : (
          <>
            {/* <a className="nav-link text-light" onClick={logoutHandler} style={{ cursor: "pointer" }}>Logout</a>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <MdAccountCircle style={{ color: 'white', marginRight: 0 }} />
              <Link className="nav-link text-light" href="/dashboard" style={{ marginLeft: 0 }}>
                {state?.user?.name}
              </Link>
            </div> */}
            <Link className="nav-link text-light" aria-current="page" href="/">Home</Link>
            <div className="dropdown">
              <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                {state?.user?.name}
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <Link className="nav-link text-dark dropdown-item" href="/dashboard" style={{ marginLeft: 0 }}>
                    DashBoard
                  </Link>
                </li>
                <li>
                  <Link className="nav-link text-dark dropdown-item" href="/profile/update" style={{ marginLeft: 0 }}>
                    Profile
                  </Link>
                </li>
                {/* <li><a className="dropdown-item" href="#">Another action</a></li> */}
                <a className="nav-link text-dark dropdown-item" onClick={logoutHandler} style={{ cursor: "pointer" }}>Logout</a>
              </ul>
            </div>

          </>
        )
      }



      {/* <li className="nav-item">
    <Link className="nav-link disabled" href="#" tabIndex={-1} aria-disabled="true">Disabled</Link>
  </li> */}
    </ul>

  )
}

export default Nav