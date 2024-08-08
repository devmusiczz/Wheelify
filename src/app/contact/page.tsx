"use client";
import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

const ContactPage: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      emailjs.sendForm('service_lhamoq6', 'template_0y35ner', form.current, 'sSXTimZr98aq10qg1')
        .then((result) => {
          console.log(result.text);
          alert('Message sent successfully!');
        }, (error) => {
          console.log(error.text);
          alert('An error occurred, please try again.');
        });
    }
  };

  return (
    <div className="container mt-20 mx-auto p-4 text-white">
      <h1 className="text-4xl font-bold mb-4 text-red-500">Contact Us</h1>
      <p className="mb-8">
        Have any questions or need assistance? We are here to help! Reach out to us through any of the methods below.
      </p>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-red-500">Customer Support</h2>
        <p>
          Our customer support team is available 24/7 to assist you with your inquiries. You can contact us via email or phone.
        </p>
        <ul className="list-disc list-inside mt-4">
          <li>Email: <a href="mailto:support@wheelify.com" className="text-red-500 underline">info@wheelify.com</a></li>
          <li>Phone: <a href="tel:+1234567890" className="text-red-500 underline">+91-9718707070</a></li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-red-500">Visit Us</h2>
        <p>
          You can also visit our office at the following address:
        </p>
        <address className="mt-4 not-italic">
          Wheelify.in<br />
          Gl bajaj Incubation Centre<br />
          knowledge park 2<br />
          Greater Noida, UP, India
        </address>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-red-500">Send Us a Message</h2>
        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <div>
            <label className="block text-red-500 mb-2" htmlFor="name">Name</label>
            <input className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white" type="text" id="name" name="name" required />
          </div>
          <div>
            <label className="block text-red-500 mb-2" htmlFor="email">Email</label>
            <input className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white" type="email" id="email" name="email" required />
          </div>
          <div>
            <label className="block text-red-500 mb-2" htmlFor="message">Message</label>
            <textarea className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white" id="message" name="message" rows={5} required></textarea>
          </div>
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" type="submit">Send Message</button>
        </form>
      </section>
    </div>
  );
};

export default ContactPage;