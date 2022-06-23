import * as React from "react";
import { FecthProjectsURL } from "../Constants/ApiConfig";

function ProjectDashboard({setPage})
{
  
  setPage('Project Dashboard');
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
     <div> <span> Available Projects</span>
 
        <div className="section-grid">
          <div className="section-row">
<span className="item" > PROJECT NAME</span>
<span className="item" > SKILL SET</span>
<span className="item" > START DATE</span>
<span className="item" > NUMBER OF RESOURCES</span>
<span className="item" > STATUS</span>
          </div>
            {
                projectData && 
                projectData.projects.map((item)=>(
                   <div className="section-row">
<span className="item"> {item.ProjectName}</span>
<span className="item"> {item.SkillSet}</span>
<span className="item"> {item.StartDate}</span>

<span className="item"> {item.NoOFResources}</span>
<span className="item"> {item.Status}</span>
                   </div>
                     
     
                 ) )
                
            }

        </div>
     </div>
    );
}

export default  React.memo(ProjectDashboard);