import logo from "../assets/img/logo.png"

export const About = () => {
  return (
    <section>
        <div className="about mt-4 flex-row">
          <div className="abt-title font-bold">
            <h1 style={{ fontSize: '2rem', color: 'maroon' }}>About</h1>
          </div>
          <div><h3 className="font-medium" style={{ fontSize: '18px', color: 'black',}}>This website provides a compilation of common Matigsalug words alongside their English translations. Its primary objective is to preserve and promote the Matigsalug language.</h3></div>
          <div className="abt-content text-justify mb-4 mt-4 ">
          <p>In an era where linguistic diversity faces threats from global influences, this platform aims to safeguard indigenous languages like Matigsalug, ensuring their cultural richness endures. By offering accessible Matigsalug vocabulary, the website encourages language learning and fosters a deeper appreciation for indigenous heritage. Its mission is to contribute to the preservation and revitalization of the Matigsalug language for generations to come. </p>
          </div>
        </div>
    </section>
  )
}
