'use client';

import { IFormData } from '@/lib/definitions';
import { sendEmail } from '@/lib/sendEmail';
import { getStrapiData } from '@/lib/serverUtil';
import { useEffect, useState } from 'react';

interface IStrapiData {
  title: string;
  form_description: string;
}

export default function Page() {
  const [strapiData, setStrapiData] = useState<IStrapiData>({ title: '', form_description: '' });
  const [formData, setFormData] = useState<IFormData>({ name: '', email: '', message: '', subject: '' });
  const [errors, setErrors] = useState<IFormData>({ name: '', email: '', message: '', subject: '' });
  const [submissionStatus, setSubmissionStatus] = useState('');

  useEffect(() => {
    async function fetchData() {
      const strapiData = await getStrapiData('/api/contact-page');
      setStrapiData(strapiData);
    }
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let valid = true;
    const newErrors: IFormData = { name: '', subject: '', email: '', message: '' };

    if (!formData.name) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    if (!formData.email) {
      newErrors.message = 'Email is required';
      valid = false;
    }
    if (!formData.subject) {
      newErrors.subject = 'Project objective is required';
      valid = false;
    }
    if (!formData.message) {
      newErrors.message = 'Project details are required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const response = await sendEmail(formData);
      if (response.success) {
        setSubmissionStatus('Form submitted successfully!');
      } else {
        setSubmissionStatus(`Error: ${response.message}`);
      }
    }
  };
  const { title, form_description } = strapiData;

  return (
    <div className="lg:w-3/6 text-center mx-auto">
      <div className="description mb-36">
        <h1 className="text-3xl font-bold mb-24">{title}</h1>
        <p className="text-2xl font-medium">{form_description}</p>
      </div>

      <div className="form" onSubmit={handleSubmit}>
        <div className="inputs mb-8">
          <div className="flex flex-col xl:flex-row gap-x-4 mb-8">
            <div className="form-element w-full xl:w-1/2 mb-4 text-start">
              <label htmlFor="name" className="text-xl font-semibold">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="bg-black-10 border border-black-10 text-gray-900 text-sm rounded-lg focus:border-black-100 focus:bg-white-ish w-full p-2.5"
                placeholder="John Smith"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>

            <div className="form-element w-full xl:w-1/2 mb-4 text-start">
              <label htmlFor="name" className="text-xl font-semibold">
                Email
              </label>
              <input
                type="email"
                id="name"
                className="bg-black-10 border border-black-10 text-gray-900 text-sm rounded-lg focus:border-black-100 focus:bg-white-ish w-full p-2.5"
                placeholder="john.smith@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>

            <div className="form-element w-full xl:w-1/2 mb-4 text-start">
              <label htmlFor="email" className="text-xl font-semibold">
                Project objective
              </label>
              <input
                type="text"
                id="subject"
                className="bg-black-10 border border-black-10 text-gray-900 text-sm rounded-lg focus:border-black-100 focus:bg-white-ish w-full p-2.5"
                placeholder="Komercial video"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
          </div>

          <div className="form-element text-start">
            <label htmlFor="message" className="text-xl font-semibold">
              Project details
            </label>
            <textarea
              id="message"
              rows={4}
              className="bg-black-10 border border-black-10 text-gray-900 rounded-lg focus:border-black-100 focus:bg-white-ish p-2.5 w-full text-sm"
              placeholder="Hello! I would like to discuss a project with you."
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        <a id="mailSubmit">
          <button className="rounded-full py-3 bg-orange w-full text-center text-white-ish" type="submit">
            Send message
          </button>
        </a>

        {submissionStatus && <p>{submissionStatus}</p>}
      </div>
    </div>
  );
}
