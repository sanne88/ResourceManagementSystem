import * as React from "react";
import ReactSelect from "react-select";
import { Link, useLocation } from "react-router-dom";
import { FetchResourceURL, UpdateResourceDataURL } from "../Constants/ApiConfig";
import DateTimePicker from 'react-datetime-picker';
import {Option} from "../component/Option";
import {toast} from "react-toastify";
function ResourceDashboard({setPage})
{
setPage('Resource Dashboard');
const [resourceData, setResourceData] = React.useState(null);
const [ availDate,setDate]=React.useState(()=> new Date());
const [ optSelected,setOptSelected]=React.useState(null);
const [ lstSkill, setList] =React.useState([]);
const handleSave=()=>{
  let data ={
"AvailableDate":  new Date(resourceData.availableDate),
"Skills": lstSkill

  };

  fetch(UpdateResourceDataURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.message === "Success") {
        toast.success("Data Saved Successfully !", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        toast.info("Error !", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    })
    .catch((err) => {
      toast.error("Failed to Save !", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    });
  
}
 const handleClick=()=>{
//add skill to resource data
    let data= {...resourceData};

    if(optSelected!=null)
    {
      optSelected.map((item)=>{
      data.resourceSkills.push({"userid":1, "Skillid": item.value,"Name": item.label });
      if(lstSkill.indexOf(item.value)==-1)
       lstSkill.push([3,item.value]); 
    })
    }
    setResourceData(data);
    setList(lstSkill);
    setOptSelected(null);


  };

 const handleSkillCHane=(selected)=>{
  setOptSelected(selected);
 };
 const handleDateChange=(e)=>{
  setDate(e);
 let data={...resourceData};
 data.availableDate=e.toDateString();

 setResourceData(data);

 }
 const fetchResourceData = () => {
        const url = FetchResourceURL;
        fetch(url)
          .then((res) => res.json())
          .then((res) => {
            setResourceData(res);
            setDate( new Date(res.availableDate));
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
<span> CURRENT SKILLS : </span>
<div className="section-current">
 
{ resourceData&& resourceData.resourceSkills  &&
      resourceData.resourceSkills.map((skill)=> (
       
        <h5>{skill.Name} </h5>
           ))
 }
 </div>
 </section> 

<section className="section-grid">
 
  <span className="item"> SELECT SKILL</span> 
  <div className="select item">
  <ReactSelect
    options={resourceData && resourceData.skills}
    isMulti
    closeMenuOnSelect={false}
    components={{
      Option
    }}
    onChange={handleSkillCHane}
    hideSelectedOptions={false}
  value={optSelected}
  />
  </div>
  
<button className="btn btnWidth" id="btnAdd" onClick={handleClick}> Add Skill</button>

</section>

 <section className="section-skills">

<span> AVAILAIBLE DATE : </span>
<DateTimePicker 
disableClock
onChange={handleDateChange} 
value={availDate}
/> 

{resourceData&& resourceData.availableDate}
 </section>

 <button className="btn btnWidth" onClick={handleSave}> Save</button>
 <div className="section-grid">
     <span> PROJECTS APPLIED</span>
     <div className="section-row">
  
    <span className="item"> ProjectName</span>
    <span className="item"> Skill Set</span>
    </div>

 { resourceData &&
      resourceData.projects.map((proj)=> (
        <div className="section-row">
          <span  className="item">{proj.ProjectName} </span>
          <span className="item" >{proj.SkillSet} </span>  
     </div>
         
        ))
 }
 </div>
 <Link   to="/ProjectDashboard" > VIEW PROJECTS</Link>
</div>

);

      
}

export default React.memo(ResourceDashboard);