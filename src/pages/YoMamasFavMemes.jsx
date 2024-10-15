const YoMamasFavMemes = () => {
  return (
    <>
    <section className="flex justify-center">
      <h1>IT'S YO MAMAS FAV MEMES OF ALL TIMES!</h1>
      <div className="gallery">
        <div className="memeContainer border-2 text-center">
          <h3 className="memeName text-sm p-4">I was told there would be</h3>
          <img src="https://a.pinatafarm.com/590x462/fb98437b64/i-was-told-there-would-be.jpg" alt="" />
          <div className="expMessage pt-4">
          <p className="memeExp">THIS MEME IS DOOMED IN:</p>
          <p className="memeExpTimer">00 DAYS 00 MINUTES 00 SECONDS</p>
          </div>
          <div className="memeButtons flex justify-between p-8">
            <button className="dwnMeme btn btn-success">SAVE MEME</button>
            <button className="delMeme btn btn-error">GO TO HELL</button>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default YoMamasFavMemes