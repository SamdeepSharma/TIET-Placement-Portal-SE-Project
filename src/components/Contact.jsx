import './Contact.css'
import { toast } from "react-toastify";
import { useForm } from 'react-hook-form';

const Contact = () => {
    const { register, handleSubmit, reset, isSubmitting, formState: { errors } } = useForm();

    const host = 'https://tiet-pms-backend.vercel.app';

    const onSubmit = async (data) => {
        try {
            const response = await fetch(`${host}/api/contact-form/submit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: data.email, feedback: data.feedback, name: data.name, phone: data.phone }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const json = await response.json()
            console.log(json)
            if (json) {
                //save the auth-token to local storage and redirect to home
                toast.success('🎉 Form Submitted!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                reset();
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <section className="banner">
                <h1>Get in Touch With Us</h1>
                <p>We are here to answer any questions you may have.</p>
            </section>

            <section className="contact-form">
                <div className="form-container">
                    <h2>Your Details</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputName" className="form-label">Name</label>
                            <input
                                type="text"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                id="exampleInputName"
                                placeholder="John Doe"
                                {...register('name', {
                                    required: 'Name is required'
                                })}
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input
                                type="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                id="exampleInputEmail1"
                                placeholder="example123@example.com"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: 'Invalid email format'
                                    }
                                })}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputPhone" className="form-label">Phone Number</label>
                            <input
                                type="tel"
                                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                id="exampleInputPhone"
                                placeholder="1234567890"
                                {...register('phone', {
                                    required: 'Phone number is required'
                                })}
                            />
                            {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputFeedback" className="form-label">Feedback</label>
                            <textarea
                                className={`form-control ${errors.feedback ? 'is-invalid' : ''}`}
                                id="exampleInputFeedback"
                                rows="4"
                                placeholder="Your feedback here..."
                                {...register('feedback', {
                                    required: 'Feedback is required'
                                })}
                            ></textarea>
                            {errors.feedback && <div className="invalid-feedback">{errors.feedback.message}</div>}
                        </div>

                        <button type="submit" disabled={isSubmitting} className="btn btn-success m-2">{isSubmitting? 'Submitting': 'Submit'}</button>
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
