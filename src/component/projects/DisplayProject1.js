
const DisplayProject = (props) => {
    console.log("Inside display "+ props.proj.projectName)

return (
     <div> 
         
        Project Id : {props.proj.projectId}
        Project Name : {props.proj.projectName}
        Version   : {props.proj.version}
        Owner : {props.proj.owner}
        Components Count :{ props.proj.componentsCount}

     </div>
 

)
            
}

export default DisplayProject;
