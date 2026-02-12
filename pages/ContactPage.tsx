
import React, { useState, FormEvent, FocusEvent } from 'react';

const departments = [
    { name: 'Sales', email: 'sales@vistatouch.com.gh', icon: 'fa-house-signal' },
    { name: 'Lettings', email: 'lettings@vistatouch.com.gh', icon: 'fa-key' },
    { name: 'Developments', email: 'developments@vistatouch.com.gh', icon: 'fa-building-user' },
    { name: 'Logistics', email: 'logistics@vistatouch.com.gh', icon: 'fa-truck-fast' },
    { name: 'BTR Team', email: 'btrteam@vistatouch.com.gh', icon: 'fa-city' },
    { name: 'Admin', email: 'admin@vistatouch.com.gh', icon: 'fa-file-alt' },
    { name: 'Office', email: 'office@vistatouch.com.gh', icon: 'fa-building' },
    { name: 'Accounts', email: 'accounts@vistatouch.com.gh', icon: 'fa-coins' },
    { name: 'COO', email: 'coo@vistatouch.com.gh', icon: 'fa-user-tie' },
    { name: 'MD', email: 'md@vistatouch.com.gh', icon: 'fa-user-tie' },
    { name: 'CEO', email: 'ceo@vistatouch.com.gh', icon: 'fa-user-tie' },
];

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', department: '', message: '' });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateField = (name: string, value: string): string => {
        switch (name) {
            case 'name':
                if (!value.trim()) return 'Full name is required.';
                break;
            case 'email':
                if (!value.trim()) return 'Email address is required.';
                if (!/\S+@\S+\.\S+/.test(value)) return 'Email address is invalid.';
                break;
            case 'department':
                if (!value) return 'Please select a department.';
                break;
            case 'message':
                if (!value.trim()) return 'Message is required.';
                break;
            default:
                break;
        }
        return '';
    };

    const validate = (): { [key: string]: string } => {
        const newErrors: { [key: string]: string } = {};
        Object.keys(formData).forEach((key) => {
            const field = key as keyof typeof formData;
            const error = validateField(field, formData[field]);
            if (error) {
                newErrors[field] = error;
            }
        });
        return newErrors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
        }
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsSubmitted(false);
        } else {
            setErrors({});
            setIsSubmitted(true);
            // Here you would typically send the data to a server
            console.log('Form submitted:', formData);
        }
    };

    return (
        <div>
            {/* Page Header */}
            <section className="bg-primary text-white py-12 text-center">
                <h1 className="text-4xl font-bold">Get In Touch</h1>
                <p className="mt-2 text-lg">We'd love to hear from you. Reach out to the right department below.</p>
            </section>
            
            {/* Department Emails */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                     <h2 className="text-3xl font-bold text-primary text-center mb-12">Contact a Department</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {departments.map(dept => (
                            <div key={dept.name} className="flex items-center bg-white p-4 rounded-lg shadow-md">
                                <i className={`fas ${dept.icon} text-primary text-2xl w-12 text-center`}></i>
                                <div className="ml-4">
                                    <h3 className="font-semibold text-primary">{dept.name}</h3>
                                    <a href={`mailto:${dept.email}`} className="text-accent hover:underline text-sm">{dept.email}</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="py-16 bg-light-gray">
                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-3xl font-bold text-primary mb-8">Send Us a Message</h2>
                        {isSubmitted ? (
                            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md" role="alert">
                                <p className="font-bold">Message Sent!</p>
                                <p>Thank you for contacting us. We will get back to you shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                                <div>
                                    <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} onBlur={handleBlur} className={`w-full p-3 border rounded-md bg-white text-text-dark ${errors.name ? 'border-red-500' : 'border-gray-300'}`} />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} onBlur={handleBlur} className={`w-full p-3 border rounded-md bg-white text-text-dark ${errors.email ? 'border-red-500' : 'border-gray-300'}`} />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>
                                <div>
                                    <select name="department" value={formData.department} onChange={handleChange} onBlur={handleBlur} className={`w-full p-3 border rounded-md bg-white text-text-dark ${errors.department ? 'border-red-500' : 'border-gray-300'}`}>
                                        <option value="">Select Department</option>
                                        {departments.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
                                    </select>
                                    {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
                                </div>
                                <div>
                                    <textarea name="message" placeholder="Your Message" rows={5} value={formData.message} onChange={handleChange} onBlur={handleBlur} className={`w-full p-3 border rounded-md bg-white text-text-dark ${errors.message ? 'border-red-500' : 'border-gray-300'}`}></textarea>
                                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                                </div>
                                <button type="submit" className="w-full bg-accent text-white p-3 rounded-md font-bold hover:bg-yellow-600 transition-colors">Send Message</button>
                            </form>
                        )}
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-primary mb-8">Visit Us</h2>
                        <div className="space-y-4 text-gray-700">
                            <p className="flex items-start"><i className="fas fa-map-marker-alt text-accent mt-1 mr-4"></i><span>123 Osu Oxford Street, Accra, Ghana</span></p>
                            <p className="flex items-start"><i className="fas fa-phone text-accent mt-1 mr-4"></i><span>+233 (0) 24 123 4567<br />+233 (0) 55 987 6543</span></p>
                            <h3 className="font-bold text-primary pt-4">Working Hours</h3>
                            <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                            <p>Saturday: 9:00 AM - 1:00 PM</p>
                            <p>Sunday: Closed</p>
                        </div>
                    </div>
                </div>
            </section>
            
             {/* Map Embed */}
            <section>
                 <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.8354316043137!2d-0.1853613857317371!3d5.590123734794883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9a79c1cb2bf3%3A0x67bdc362d2e13271!2sOxford%20Street!5e0!3m2!1sen!2sgh!4v1678886452123!5m2!1sen!2sgh" 
                    width="100%" 
                    height="450" 
                    style={{ border: 0 }} 
                    allowFullScreen={true}
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="VistaTouch Homes Location"
                ></iframe>
            </section>
        </div>
    );
};

export default ContactPage;
