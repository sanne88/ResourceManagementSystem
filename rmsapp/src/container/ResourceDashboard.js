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
<div className="dashboard">

<section className="section-skills">   
{ resourceData &&
      resourceData.Skills.map((skill)=> (
        <h4>{skill.SkillName}</h4>     
      ))
 }
 </section> 
 <section className="section-resume">

<label> AvailableDate : </label>

<label> Resume : </label>

 </section>
 <div className="section-projects">
     <label> Projects Applied</label>
 { resourceData &&
      resourceData.Skills.map((skill)=> (
        <div className="grid-item">{skill.SkillName}</div>     
      ))
 }
 </div>
</div>

);

      
}

export default React.memo(ResourceDashboard);