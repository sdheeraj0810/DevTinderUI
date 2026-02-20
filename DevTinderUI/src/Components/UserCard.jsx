const UserCard=(props)=>{
    return (
        <div className="card bg-base-100 w-96 shadow-sm">
    <figure>
        <img className="w-full"
        src={props.userData.photoUrl}
        alt="Shoes" />
    </figure>
    <div className="card-body absolute bottom-0 w-full">
        <div className="flex flex-row gap-2 items-center">
        <h2 className="card-title">{props.userData.firstName + " " + props.userData.lastName}</h2>
        <p>{props.userData.age}</p>
        </div>
        <p>{props.userData.about}</p>
        {!props.preview &&
        (<div className="card-actions justify-between"  >
            <button className="btn btn-circle bg-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <button className="btn btn-circle bg-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
            </button>
        </div>)
         }
    </div>
    </div>
    )
}

export default UserCard;