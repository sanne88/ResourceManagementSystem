function Header({title,handleLogout,isAuthenticated})
{
    return(
    <div className="header">
        
        <h3 className="title"> {title}</h3>
     <p style={{"text-align":"right"}}>
     {isAuthenticated !=null  && isAuthenticated ?    
            <button className="btn btnWidth" onClick={handleLogout}> Logout </button> :
            ''
     }
       </p>

    </div>

    );
}

export default Header;