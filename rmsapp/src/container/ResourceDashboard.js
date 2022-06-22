import * as React from "react";
import ReactSelect from "react-select";
import { useLocation } from "react-router-dom";
import { FetchResourceURL, UpdateResourceDataURL } from "../Constants/ApiConfig";
import DateTimePicker from 'react-datetime-picker';
import {Option} from "../component/Option";
import {toast} from "react-toastify";
function ResourceDashboard()
{

const [resourceData, setResourceData] = React.useState(null);
const [ availDate,setDate]=React.useState(()=> new Date());
const [ optSelected,setOptSelected]=React.useState(null);

const handleSave=()=>{
  let data ={
"AvailableDate": resourceData.availDate,
"ResourceSKills": resourceData.resourceSkills

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
      data.resourceSkills.push({"UserId":1, "SkillId": item.value,"SkillName": item.label });

    })
    }
    setResourceData(data);
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
<span> Add a Skill </span> 
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
<button onClick={handleClick}> Add Skill</button>
</section>
<section className="section-skills">   
<span> Current Skills : </span>

{ resourceData&& resourceData.resourceSkills  &&
      resourceData.resourceSkills.map((skill)=> (
       
        <h4>{skill.SkillName}</h4>     

      ))
 }
 </section> 
 <section className="section-resume">

<label> AvailableDate : </label>
{resourceData&& resourceData.availableDate}
<DateTimePicker 
disableClock
onChange={handleDateChange} 
value={availDate}
/> 
<label> Resume : </label>

 </section>

 <button onClick={handleSave}> Save</button>
 <div className="section-projects">
     <label> Projects Applied</label>
 { resourceData &&
      resourceData.projects.map((proj)=> (
        <div className="grid-item">{proj.ProjectName} 
      <div className="grid-item">{proj.Skillset} </div>  
        </div>  
        ))
 }
 </div>
</div>

);

      
}

export default React.memo(ResourceDashboard);