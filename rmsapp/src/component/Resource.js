export function Resource({props,userId,updateStatus})
{
    return(
        <div className="section-flex">
     {props.userName}
      {props.skillSet}
      {props.availableDate}
      {props.Status}
        <button onClick={updateStatus}> Update Status</button>
      </div>
      


    );
}
