import * as React from "react";
import {Option} from "../component/Option";
import ReactSelect from "react-select";
import DateTimePicker from "react-datetime-picker";
import {Resource} from "../component/Resource";
import {FecthStaffDataURL,FindResourcesURL} from "../Constants/ApiConfig";
function StaffDashboard()
{
const [ appData,setAppData]=React.useState(null);
const [ optSelected,setOptSelected]=React.useState(null);
const [ resData,setResData]=React.useState(null);

const [ availDate,setDate]=React.useState(()=> new Date());

const updateStatus=(userId)=>{
        console.log('asd');
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
        let data = {
                "Skills": optSelected,
                "AvailableDate": availDate
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
        <section id="search"> 
        <span> Select Skill </span> 
        <ReactSelect
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
<span>Select Date:</span>
<DateTimePicker 
disableClock
onChange={handleDateChange} 
value={availDate}
/> 
<button onClick={findResources}>Find Resources </button>
        </section>
        <br/>
        <section>
                
        {resData && resData.resources.map ((res)=> (
<Resource props={res} userId={res.userId} updateStatus={ updateStatus}/>

        ))
}

</section>
        </div>
      
    );

}
export default React.memo(StaffDashboard);