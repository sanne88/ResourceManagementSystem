export function Resource({props,userId,updateStatus})
{
    return(
        <div className="section-row">
  <span className="item">   {props.userName}</span>  
  <span className="item">    {props.skillSet}</span> 
  <span className="item">   {props.availableDate}</span> 
  <span className="item">  {props.Status}</span> 
     <input type="checkbox" id={props.userId} className="item" onChange={updateStatus}  />
      </div>
      


    );
}
