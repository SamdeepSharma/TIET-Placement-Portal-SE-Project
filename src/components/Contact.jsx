import './Contact.css'

const Contact = () => {
  return (
    <div>
            <section className="banner">
                <h1>Get in Touch With Us</h1>
                <p>We are here to answer any questions you may have.</p>
            </section>

            <section className="contact-form">
                <div className="form-container">
                    <h2>Your Details</h2>
                    <form action="#" method="POST">
                        <label htmlFor="name">Name: </label>
                        <input type="text" id="name" name="name" required />

                        <label htmlFor="email">Email: </label>
                        <input type="email" id="email" name="email" required />

                        <label htmlFor="phone">Phone: </label>
                        <input type="tel" id="phone" name="phone" />

                        <label htmlFor="message">Message: </label>
                        <textarea id="message" name="message" rows="4" required></textarea>

                        <button type="submit" className="submit-button">Submit</button>
                    </form>
                </div>
            </section>

            <footer>
                <section className="contact-info">
                    <h2>Contact Information</h2>
                    <address>
                        Thapar Institute of Engineering & Technology<br />
                        P.O. Box 32,Bhadson Road<br />
                        Patiala,Punjab,Pin-147004,India<br />
                        Phone: <a href="tel:18002024100">18002024100</a><br />
                        Email: <a href="mailto:admissions@thapar.edu">admissions@thapar.edu</a>
                    </address>
                </section>
            </footer>
        </div>
  )
}

export default Contact
