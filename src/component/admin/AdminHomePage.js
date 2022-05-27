
import "./AdminHomePage.css"

const AdminHomePage = () => {
    const user = localStorage.getItem("user");

    // header 
    // navigation 
    // registration page 


    return (

        <div>
            <h1 className="header"> Welcome {user.firstName} to Admin Console </h1>
            <div className="navBox">
            <div class="navbar">
                <a href="/home/user/registration"> Create User </a>
                <a href="/home/admin/project/add"> Create Project </a>
                <a href="/home/admin/assign"> Assign Project</a>
                <a href="#"> Manage Role</a>
                <a href="#">Block User</a>
               
                </div>
           
            </div>



        </div>
    )

};

export default AdminHomePage;