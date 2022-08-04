export function Resource({props,userId,updateStatus})
{
    return(
        <div className="section-row">
  <span className="item">   {props.userName}</span>  
  <span className="item">    {props.Skillset}</span> 
  <span className="item">   {props.availableDate}</span> 
  <span className="item"> 
  {
  props.ishired===1 ? "Hired" : "Not Hired"
  
  }</span> 
  <input type="checkbox" id={props.userId} checked={props.ishired} className="item" onChange={e => updateStatus(props.userId,e.target.checked,props.projectmapid)}  />
      </div>
      


    );
}
