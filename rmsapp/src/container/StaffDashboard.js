import * as React from "react";
import {Option} from "../component/Option";
import ReactSelect from "react-select";
import DateTimePicker from "react-datetime-picker";
import {Resource} from "../component/Resource";
import { Link } from "react-router-dom";
import {FecthStaffDataURL,FindResourcesURL} from "../Constants/ApiConfig";
function StaffDashboard({setPage})
{
        setPage('Staff Dashboard');
const [ appData,setAppData]=React.useState(null);
const [ optSelected,setOptSelected]=React.useState(null);
const [ resData,setResData]=React.useState(null);

const [ availDate,setDate]=React.useState(()=> new Date());

const updateStatus=(userId)=>{
        console.log(userId);
        let data ={...resData};
data.resources[0].Status='B';

console.log(data);
setResData(data);
}

const handleDateChange=(e)=>{
        setDate(e);   
      
       }
const findResources=() =>
{
        let values =[];
      if(optSelected!=null)
      {
         values = optSelected.map(function(item) {
                return item.value;
             });

        }
        let data = {
                "Skills": values,
                "AvailableDate": new Date(availDate)
        }
        const url=FindResourcesURL;
        fetch(url,
                {
                        method: "POST",
                        headers: {
                          Accept: "application/json",
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                })
        .then((res) => res.json())
        .then((res) => {
              setResData(res);
        })
        .catch((err) => {
       //   setError("failed to fetch data!");
        });
    

}
const fetchDashboardData = () => {
        const url = FecthStaffDataURL;
        fetch(url)
          .then((res) => res.json())
          .then((res) => {
                setAppData(res);
          })
          .catch((err) => {
         //   setError("failed to fetch data!");
          });
      };

    React.useEffect(() => {
        fetchDashboardData();
      }, []);


 const handleSkillCHane=(selected)=>{
      
    setOptSelected(selected);
   };
    return(
        <div className="staff-app">
        <section id="search" className="section-row"> 
        <span className="span"> SELECT SKILL </span> 
        <ReactSelect className="select"
  options={appData && appData.skills}
  isMulti
  closeMenuOnSelect={false}
  components={{
    Option
  }}
  onChange={handleSkillCHane}
  hideSelectedOptions={false}
 value={optSelected}
/>

        </section>
        <section className="section-row">
        <span className="span">SELECT DATE:</span>   
<DateTimePicker 
disableClock
onChange={handleDateChange} 
value={availDate}
/> 
<button className="btn" onClick={findResources}>Find Resources </button>
        </section>
        <br/>
        <section className="section-grid">
         <div className="section-row">
                <span className="item"> Resource Name</span>
                
                <span className="item"> Skill Set</span>
                <span className="item">AvailableDate</span>
                <span className="item">Current Status</span>
                <span className="item">IsHired</span>
                </div>   
                 
        {resData && resData.resources && resData.resources.map ((res)=> (
<Resource props={res} userId={res.userId} updateStatus={ updateStatus}/>

        ))
        
}

</section>

<Link   to="/ProjectDashboard" > VIEW PROJECTS</Link>
        </div>
      
    );

}
export default React.memo(StaffDashboard);