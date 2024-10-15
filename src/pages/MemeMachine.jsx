const MemeMachine = () => {
  return (
    <>
    <section className="memeMachine text-center border-2 border-red-500">
      <div className="controlRoom h-auto w-auto border-2 rounded-md flex justify-center align-middle">
        <div className="imageSide border-2 border-red-500">
          <input className="imgName w-full input input-bordered input-base-100" type="text" placeholder="I was told there would be" />
          <div className="imageContainer">
            <img src="https://a.pinatafarm.com/590x462/fb98437b64/i-was-told-there-would-be.jpg" alt="" />
          </div>
        </div>
        <div className="controlSide border-2 border-blue-500 p-16">
          <div className="upperButtonContainer flex justify-around">
            <button className="uplBtn btn btn-accent">UPLOAD MA MEMEZ</button>
            <button className="rndmBtn btn btn-warning">GIMME RANDOM</button>
          </div>
            <input className="searchInput w-full input input-bordered input-base-100 mt-6" type="text" placeholder="SEARCH_MEMEZ" />
          <div className="inputContainer">
            <input className="topInput w-full input input-bordered input-primary mt-6" type="text" placeholder="TOP_TEXT" />
            <input className="btmInput w-full input input-bordered input-secondary my-6" type="text" placeholder="BOTTOM_TEXT" />
          </div>
          <div className="lowerButtonContainer flex justify-around">
            <button className="genBtn btn btn-success">I MAKE THIS</button>
            <button className="resBtn btn btn-error">GET OUTTA HERE</button>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default MemeMachine