import styles from './page.module.scss'

export default function Contact() {
  return (
    <section className={`${styles.grid}`} >
      <h1 className={`${styles.h1}`} >I love to hear from people!</h1>
        <iframe className={`${styles.contact}`}
            aria-label="This is a contact form, send Candy Fluffs a note!"
            frameBorder={0}
            title="Candy Fluffs Contact Form"
            src="https://us16.list-manage.com/contact-form?u=f0ccd4aae40398b03156934fd&form_id=a52d1c81b8d8ff1a843eaa0798c8941e">
        </iframe>
    </section>

  )
} 