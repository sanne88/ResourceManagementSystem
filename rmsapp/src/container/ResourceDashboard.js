import * as React from "react";
import { useLocation } from "react-router-dom";
import { FetchResourceURL } from "../Constants/ApiConfig";

function ResourceDashboard()
{

 const [resourceData, setResourceData] = React.useState(null);

 const fetchResourceData = () => {
        const url = FetchResourceURL;
        fetch(url)
          .then((res) => res.json())
          .then((res) => {
            setResourceData(res);
          })
          .catch((err) => {
         //   setError("failed to fetch data!");
          });
      };

    React.useEffect(() => {
        fetchResourceData();
      }, []);

      return(
<div>
    
{ resourceData &&
      resourceData.Skills.map((skill)=> (
        <h4>{skill.SkillName}</h4>     
      ))
 }
</div>

);

      
}

export default React.memo(ResourceDashboard);