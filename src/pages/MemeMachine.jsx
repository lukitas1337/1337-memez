const MemeMachine = () => {
  return (
    <>
    <section className="memeMachine">
      <div className="controlRoom h-auto w-auto border-2 rounded-md">
        <div className="imageSide">
          <h3>I was told there would be</h3>
          <div className="imageContainer">
            <img src="https://a.pinatafarm.com/590x462/fb98437b64/i-was-told-there-would-be.jpg" alt="" />
          </div>
        </div>
        <div className="controlSide">
          <div className="upperButtonContainer">
            <button className="uplBtn btn btn-accent">UPLOAD MA MEMEZ</button>
            <button className="rndmBtn btn btn-warning">GIMME RANDOM</button>
            <input className="searchInput input input-bordered input-base-100" type="text" placeholder="SEARCH_MEMEZ" />
          </div>
          <div className="inputContainer">
            <input className="topInput input input-bordered input-primary" type="text" placeholder="TOP_TEXT" />
            <input className="btmInput input input-bordered input-secondary" type="text" placeholder="BOTTOM_TEXT" />
          </div>
          <div className="lowerButtonContainer">
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