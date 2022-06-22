import * as React from "react";
import { FecthProjectsURL } from "../Constants/ApiConfig";

function ProjectDashboard()
{
    const [projectData, setProjectData] = React.useState(null);
    const fetchProjectData = () => {
        const url = FecthProjectsURL;
        fetch(url)
          .then((res) => res.json())
          .then((res) => {
            setProjectData(res);
          })
          .catch((err) => {
         //   setError("failed to fetch data!");
          });
      };

    React.useEffect(() => {
        fetchProjectData();
      }, []);

 
    return (

        <div className="project-items">
            {
                projectData && 
                projectData.projects.map((item)=>(
                   <div>
<div> {item.ProjectName}</div>
<div> {item.SkillSet}</div>
                   </div>
                
     
                 ) )
                
            }

        </div>
    );
}

export default  React.memo(ProjectDashboard);